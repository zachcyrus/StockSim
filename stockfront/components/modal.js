import styles from '../styles/modal.module.scss'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

const Modal = (props) => {

    const onClose = () => {
        props.onClose();
    }

    if (!props.show) {
        return null;
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>

                <div className={styles.closeRow}>
                    <button className={styles.closeButton} onClick={onClose}>
                        <ClearRoundedIcon fontSize="small" />
                    </button>
                </div>





                {props.children}

            </div>
        </div>
    )
}


export default Modal;