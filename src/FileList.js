import React, { Component } from 'react';
import styled from 'styled-components';
import Plain from 'slate-plain-serializer';
import TrashIcon from 'react-icons/lib/go/trashcan';

const StyledFileList = styled.nav`
    margin: 0 auto;
    min-width: 5em;
    max-width: 10em;
    font-family: Lato;
    
    ul {
        padding: 0;
        margin: 0;
        margin-bottom: 0.5em;
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
`;

const Trash = styled(TrashIcon)`
    cursor: pointer;
    min-width: 1em;
    margin-right: 1em;
    padding: 0.2em;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    background: #dcdcdc;
    color: #333333;
`;

class FileList extends Component {
    render() {
        let { files, onSelect, onDelete } = this.props;
        let fileList = files.map(f => (
            <li
                className={f.selected ? "selected" : ""}
                key={f.id}
                >
                <Trash
                    onClick={() => onDelete(f.id)}
                    ></Trash>
                <FileLink
                    onClick={() => onSelect(f.id)}
                >{Plain.serialize(f.name)}</FileLink>
            </li>
        ));
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