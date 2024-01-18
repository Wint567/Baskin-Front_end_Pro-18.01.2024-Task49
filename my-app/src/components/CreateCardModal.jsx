import React, { Component } from 'react';
import axios from 'axios';
import { getData, setDataToMockAPI } from '../api/api';

class CreateCardModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            message: '',
            image: '',
        };
    }

    handleSetDataToLocalState = () => {
        const { title, message, image } = this.state;
        this.props.setData({ title, message, image });
    };

    handleSetDataToMockApiAndGetUpdateData = async (title, message, image) => {
        await setDataToMockAPI(title, message, image);
        const updatedData = await getData();
        this.props.updateData(updatedData);
    };

    handleFormSubmit = async (e) => {
        e.preventDefault();

        const isValid = await this.isValidImageUrl(this.state.image);

        if (!isValid) {
            alert('Incorrect image link');
            return;
        }

        const { title, message, image } = this.state;

        if (!title || !message || !image) {
            alert('Please fill in all fields');
        } else {
            await this.handleSetDataToMockApiAndGetUpdateData(title, message, image);
            this.handleSetDataToLocalState();
            this.props.toggleModal();

            this.setState({
                title: '',
                message: '',
                image: '',
            });
        }
    };

    isValidImageUrl = async (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;

            img.onload = () => {
                resolve(true);
            };

            img.onerror = () => {
                resolve(false);
            };
        });
    };

    render() {
        const { showModal, toggleModal } = this.props;
        const { title, message, image } = this.state;

        return (
            <div className={`modal ${showModal ? 'show' : ''}`}>
                <div className="modal-content">
                    <span className="close" onClick={toggleModal}>
                        &times;
                    </span>
                    <form onSubmit={this.handleFormSubmit}>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => this.setState({ title: e.target.value })}
                        />

                        <label>Message:</label>
                        <textarea
                            value={message}
                            onChange={(e) => this.setState({ message: e.target.value })}
                        />

                        <label>Image URL:</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => this.setState({ image: e.target.value })}
                        />

                        <button type="submit">Create Card</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateCardModal;
