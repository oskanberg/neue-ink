import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';
import Prism, {tokenize} from 'prismjs';
import 'prismjs/components/prism-markdown';
import './Writer.css';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

class Writer extends Component {

  ref = editor => {
    this.editor = editor
  }

  onChange = ({ value }) => {
    if (value === this.props.content) return;
    this.props.onUpdate(value);
  };

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props;
    switch (node.type) {
      case 'line':
        return children;
      default:
        console.log("node.type")
        console.log(node.type)
        return next();
    }
  };

  renderMark = (props, editor, next) => {
    const { attributes, children, mark } = props;
    switch (mark.type) {
      case 'bold':
        return <b {...attributes}>{children}</b>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'title':
        return <h1 {...attributes}>{children}</h1>;
      case 'headingHash':
      // return <span></span>;
      default:
        console.log("mark.type")
        console.log(mark.type)
        return next();
    }
  }

  onKeyDown = (event, editor, next) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  decorateNode = (node, editor, next) => {
    // const others = next() || []
    // let n = decorations(node).map(d => ({
    //   anchor: {
    //     key: d.anchorKey,
    //     offset: d.anchorOffset,
    //   },
    //   focus: {
    //     key: d.focusKey,
    //     offset: d.focusOffset,
    //   },
    //   mark: {
    //     type: d.marks[0].type,
    //   }
    // }));
    // console.log(n)
    // return [...others, ...n];
    const others = next() || []
    if (node.object !== 'block') return others;

    const string = node.text;
    const texts = node.getTexts().toArray();
    const tokens = tokenize(string, Prism.languages.markdown);
    const decorations = []
    let startText = texts.shift()
    let endText = startText
    let startOffset = 0
    let endOffset = 0
    let start = 0

    function getLength(token) {
      if (typeof token == 'string') {
        return token.length
      } else if (typeof token.content == 'string') {
        return token.content.length
      } else {
        return token.content.reduce((l, t) => l + getLength(t), 0)
      }
    }

    for (const token of tokens) {
      startText = endText
      startOffset = endOffset

      const length = getLength(token)
      const end = start + length

      let available = startText.text.length - startOffset
      let remaining = length

      endOffset = startOffset + remaining

      while (available < remaining) {
        endText = texts.shift()
        remaining = length - available
        available = endText.text.length
        endOffset = remaining
      }

      if (typeof token != 'string') {
        const dec = {
          anchor: {
            key: startText.key,
            offset: startOffset,
          },
          focus: {
            key: endText.key,
            offset: endOffset,
          },
          mark: {
            type: token.type,
          },
        }

        decorations.push(dec)
      }

      start = end
    }

    return [...others, ...decorations];
  }

  render() {
    let { content } = this.props;

    return (
      <section id="writer">
        <Editor
          autoFocus
          className="editor"
          value={content}
          onChange={this.onChange}
          ref={this.ref}
          // onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          decorateNode={this.decorateNode}
        />
      </section>
    );
  }
}

export default Writer