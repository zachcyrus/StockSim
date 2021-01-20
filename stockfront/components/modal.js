import styles from '../styles/modal.module.scss'


const Modal = (props) => {

    const onClose = () => {
        props.onClose();
    }

    if(!props.show){
        return null;
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                {props.children}
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    )
}


export default Modal;