import React, { Component } from 'react';
import {GoListUnordered, GoPlus} from 'react-icons/go';

import FileList from './FileList';
import './Sidebar.css';

export default class Sidebar extends Component {
    state = {
        open: true
    };

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    render() {
        let {
            files,
            onSelect,
            onDelete,
            addFile
        } = this.props;

        return (
            <aside className={`sidebar${this.state.open ? " is-visible" : ""}`}>
                <GoListUnordered
                    className="openclose"
                    onClick={this.toggle}
                ></GoListUnordered>

                <div className="sidebar-content">
                    <FileList
                        files={files}
                        onSelect={onSelect}
                        onDelete={onDelete}
                    ></FileList>
                    <GoPlus
                        className="add"
                        onClick={addFile}
                    >
                    </GoPlus>
                </div>
            </aside>
        );
    }
}