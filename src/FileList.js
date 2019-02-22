import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Plain from 'slate-plain-serializer';
import { GoTrashcan, GoCheck } from 'react-icons/go';

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

export default ({ files, onSelect, onDelete }) => {
    let [confirm, setConfirm] = useState(-1);

    useEffect(() => {
        if (confirm === -1) return;
        let timer = setTimeout(() => setConfirm(-1), 1500)
        return () => clearTimeout(timer);
    }, [confirm]);

    const deleteFile = id => {
        if (confirm !== id) {
            setConfirm(id);
            return;
        }
        
        setConfirm(-1);
        onDelete(id);
    }

    let fileList = files.map(f => {
        const confirmThis = confirm === f.id;
        return (
            <li
                className={f.selected ? "selected" : ""}
                key={f.id}
            >
                <Delete
                    onClick={() => deleteFile(f.id)}
                    confirm={confirmThis}
                >
                    {confirmThis ? <GoCheck /> : <GoTrashcan />}
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
};