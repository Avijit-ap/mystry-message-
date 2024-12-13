'use client';

import { useCompletion } from 'ai/react';

export default function Page() {
    const { completion, input, handleInputChange, handleSubmit } = useCompletion({
        api: '/api/suggest-messges',
    });

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your question here..."
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                <h3>Generated Response:</h3>
                <p>{completion}</p>
            </div>
        </div>
    );
}
