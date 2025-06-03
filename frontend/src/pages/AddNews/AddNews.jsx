import { useState } from 'react';
import './addNews.css';

function AddNews() {

    const [activeTab, setActiveTab] = useState('manual');
    const [notes, setNotes] = useState('');
    const [posts, setPosts] = useState([]);

    const handleAddPost = () => {
        if (notes.trim()) {
            setPosts([...posts, { content: notes, type: activeTab }]);
            setNotes('');
        }
    };

    return (

        <div className="container astroblog-container">

            <div className="post-actions">
                <div className="action-tabs">
                    <button
                        className={`tab-button ${activeTab === 'manual' ? 'active' : ''}`}
                        onClick={() => setActiveTab('manual')}
                    >
                        Adicionar publicação
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'margin' ? 'active' : ''}`}
                        onClick={() => setActiveTab('margin')}
                    >
                        Acessar margem
                    </button>
                </div>

                {activeTab === 'manual' ? (
                    <div className="manual-post">
                        <div className="note-types">
                            <div className="note-option">
                                <span>Nota: ação o mão...</span>
                            </div>
                            <div className="note-option">
                                <span>Nota: ação o corredo...</span>
                            </div>
                        </div>

                        <textarea
                            className="post-textarea"
                            placeholder="Digite sua publicação aqui..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />

                        <button
                            className="add-button"
                            onClick={handleAddPost}
                        >
                            Adicionar
                        </button>
                    </div>
                ) : (
                    <div className="margin-access">
                        <h3>Notas:</h3>
                        <div className="notes-list">
                            {posts.length > 0 ? (
                                posts.map((post, index) => (
                                    <div key={index} className="note-item">
                                        <p>{post.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p>Nenhuma nota disponível</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddNews
