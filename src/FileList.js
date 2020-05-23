import React, { Component } from 'react';
import styled from 'styled-components';
import Plain from 'slate-plain-serializer';
import TrashIcon from 'react-icons/lib/go/trashcan';
import CheckIcon from 'react-icons/lib/go/check';


const StyledFileList = styled.nav`
    margin: 0 auto;
    min-width: 5em;
    max-width: 10em;
    font-family: Lato;
    
    ul {
        padding: 0;
        margin: 0;
        margin-bottom: 1em;
    }
    
    li {
        list-style: none;
        word-wrap: break-word;
        padding: 1em;
        
        display:flex;
        
        > a {
            opacity: 0.7;
            vertical-align: middle;
            display: inline-block;
            word-wrap: none;
            
            :hover {
                opacity: 1;
                text-decoration: underline;
                text-decoration-skip: 1;
                text-decoration-color: #00000088;
            }
        }
    }

    li.selected {
        color: white;
        opacity: 1;
        background: #5f5f5f;
    }
    `;

const FileLink = styled.a`
    cursor: pointer;
    min-width: 3rem;
`;

const Delete = styled.div`
    cursor: pointer;
    min-width: 1em;
    margin-right: 1em;
    padding: 0.2em;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    transition: background-color 100ms ease-in;
    background: ${props => props.confirm ? "#bb4545" : "#dcdcdc"};
    color: ${props => props.confirm ? "#fff" : "#333333"};;
    line-height: 0em;
    vertical-align: center;
`;

class FileList extends Component {

    state = {
        confirm: null
    }

    delete = id => {
        if (this.state.confirm === id) {
            this.setState({ confirm: null });
            this.props.onDelete(id);
            return;
        }

        clearTimeout(this.timer);
        this.setState({ confirm: id });
        this.timer = setTimeout(() => {
            let { confirm } = this.state;
            if (confirm === id && confirm != null) {
                this.setState({ confirm: null });
            }
        }, 1500);
    };


    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let { files, onSelect } = this.props;
        let fileList = files.map(f => {
            const confirm = this.state.confirm === f.id;

            return (
                <li
                    className={f.selected ? "selected" : ""}
                    key={f.id}
                >
                    <Delete
                        onClick={() => this.delete(f.id)}
                        confirm={confirm}
                    >
                        {confirm ? <CheckIcon /> : <TrashIcon />}
                    </Delete>
                    <FileLink
                        onClick={() => onSelect(f.id)}
                    >{Plain.serialize(f.name)}</FileLink>
                </li>
            )
        });
        return (
            <StyledFileList>
                <ul>
                    {fileList}
                </ul>
            </StyledFileList>
        );
    }
}

export default FileList;