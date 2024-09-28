import GenerateLoadingScreen from '../../generate/components/generate-loader';
import './modal.css';

export default function Modal({ answered, total, handleClose, handleSubmit, isLoading }) {
    return (
        <div className="modal-wrapper flex items-center justify-center min-h-screen">
            {isLoading ? (
                <GenerateLoadingScreen title="Submitting your answers..." subtitle=""/>
            ) : (
                <div className="modal-content">
                    <button className="absolute top-4 right-4 hover:text-gray-200" onClick={handleClose}>
                        <img src="/close.png" alt="close" />
                    </button>
                    <h2>Complete Test</h2>
                    <p className="ready-to-submit">Ready to submit your answers?</p>
                    <p className="you-have-completed">
                        You have Completed <span className="font-bold">{answered}</span> questions out of <span className="font-bold">{total}</span> in total
                    </p>
                    <div className="flex justify-between modal-btns">
                        <button className='back modal-btn' onClick={handleClose}>
                            Back to Test
                        </button>
                        <button className='submit modal-btn' onClick={handleSubmit}>
                            Submit
                            <img src="/arrow-left.png" alt="arrow" />
                        </button>
                    </div>
                </div>)}
        </div>
    )
}