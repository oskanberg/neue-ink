import React, { Component } from 'react';
import ListIco from 'react-icons/lib/go/list-unordered';
import PlusIco from 'react-icons/lib/go/plus';

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
                <ListIco
                    className="openclose"
                    onClick={this.toggle}
                ></ListIco>

                <div className="sidebar-content">
                    <FileList
                        files={files}
                        onSelect={onSelect}
                        onDelete={onDelete}
                    ></FileList>
                    <PlusIco
                        className="add"
                        onClick={addFile}
                    >
                    </PlusIco>
                </div>
            </aside>
        );
    }
}