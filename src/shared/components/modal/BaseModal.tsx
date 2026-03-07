import Button from '@/shared/ui/Button/Button';
import './BaseModal.scss'

type Props = {
    title: string;
    btnText: string;
    onClose: () => void
    onBtnClick?: () => void
    btnLoading?: boolean
    btnDisabled?: boolean
    children: React.ReactNode
}

export const BaseModal = ({ title, btnText, onClose, children, onBtnClick, btnLoading, btnDisabled }: Props) => {
    return(
        <div className="modal-wrapper"  onClick={onClose}>
            <div className="modal-inner-box" onClick={e => e.stopPropagation()}>
                <header>
                    <span>{title}</span>
                    <span className='x' onClick={onClose}>×</span>
                </header>
                <div className="container">
                    {children}
                </div>
                <Button
                    onClick={onBtnClick ?? onClose}
                    loading={btnLoading}
                    disabled={btnDisabled}
                    className='modal-btn'
                >
                    {btnText}
                </Button>
            </div>
        </div>
    )
}