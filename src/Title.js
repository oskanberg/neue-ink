import React, { Component } from 'react';
import { Editor } from 'slate-react';
import styled from 'styled-components';

const TitleContainer = styled.div`
    padding: 1em;
`;

class Title extends Component {

    ref = editor => {
        this.editor = editor
    }

    onChange = ({ value }) => {
        if (this.props.value === value) return;
        this.props.onUpdate(value);
    };

    render() {
        return (
            <TitleContainer>
                <Editor
                    value={this.props.value}
                    onChange={this.onChange}
                    ref={this.ref}
                    className={this.props.className}
                />
            </TitleContainer>
        );
    }
}

export default styled(Title)`
    border: none;
    background: white;
    width: 100%;
    text-align: center;
    font-size: 1.5em;
    font-family: 'Lato', sans-serif;
    color: #202020;
    display: block;
    margin: 0 auto;
    margin-top: 2em;
    padding: 0;
    line-height: 1em;
`;
