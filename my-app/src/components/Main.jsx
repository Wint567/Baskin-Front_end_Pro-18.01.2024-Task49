import React, { Component } from 'react';
import { getData } from '../api/api';
import CreateCardModal from './CreateCardModal';
import Card from './Card';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: null,
            randomCard: null,
            showModal: false,
            dataFromModal: null,
            prevRandomIndex: null,
            isVisible: false,
        };
    }

    componentDidMount() {
        getData().then((response) => this.setState({ cards: response }));
    }

    setModalData = ({ title, message, image }) => {
        this.setState({ dataFromModal: { title, message, image } });
    };

    handleToggleModal = () => {
        this.setState((prevState) => ({ showModal: !prevState.showModal }));
    };

    handleGetUpdateData = (data) => {
        this.setState({ cards: data });
    };

    generateCard = () => {
        const { cards, prevRandomIndex } = this.state;
        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * cards.length);
        } while (randomIndex === prevRandomIndex);

        this.setState({
            prevRandomIndex: randomIndex,
            randomCard: cards[randomIndex],
            dataFromModal: null,
            isVisible: true,
        });
    };

    render() {
        const { showModal, randomCard, isVisible, dataFromModal } = this.state;

        return (
            <main>
                <button onClick={this.generateCard}>Generate congratulation</button>
                <button
                    onClick={() => {
                        this.setState({ showModal: true, isVisible: false });
                    }}
                >
                    Create personal congratulation
                </button>

                {showModal && (
                    <CreateCardModal
                        showModal={showModal}
                        toggleModal={this.handleToggleModal}
                        setData={this.setModalData}
                        updateData={this.handleGetUpdateData}
                    />
                )}

                {randomCard && isVisible && (
                    <Card
                        image={randomCard.image}
                        title={randomCard.title}
                        message={randomCard.message}
                    />
                )}

                {!showModal && dataFromModal && (
                    <Card
                        image={dataFromModal.image}
                        title={dataFromModal.title}
                        message={dataFromModal.message}
                    />
                )}
            </main>
        );
    }
}

export default Main;
