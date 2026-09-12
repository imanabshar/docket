function AboutPage() {
    return (
        <div className="about-view">
            <div className="about-hero">
                <h1 className="about-title">Docket</h1>
                <p className="about-lede">
                    <p className="about-lede">
                        Docket is a document processing tool that automates the extraction of structured data from various types of documents, handling everything from reading the file to returning clean, ready to use fields.
                    </p>
                </p>
            </div>

            <div className="about-section">
                <h2 className="about-heading">What it does</h2>
                <p className="about-body">
                    Upload a PDF or image of a document, and Docket identifies the document type, runs OCR where needed, and returns the key fields as clean structured data ready to use as JSON.
                </p>
            </div>

            <div className="about-section">
                <h2 className="about-heading">Currently supported documents</h2>
                <div className="doc-grid">
                    <div className="doc-tile">
                        <div className="doc-tile-icon">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="8" cy="12" r="2" /><path d="M13 10h6M13 14h4" /></svg>
                        </div>
                        <span className="doc-tile-name">Emirates ID</span>
                    </div>
                    <div className="doc-tile">
                        <div className="doc-tile-icon">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="4" y="2" width="16" height="20" rx="2" /><circle cx="12" cy="10" r="3" /><path d="M8 18c0-2 2-3 4-3s4 1 4 3" /></svg>
                        </div>
                        <span className="doc-tile-name">Passport</span>
                    </div>
                    <div className="doc-tile">
                        <div className="doc-tile-icon">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 21V10l8-6 8 6v11" /><path d="M9 21v-6h6v6" /></svg>
                        </div>
                        <span className="doc-tile-name">Title deed</span>
                    </div>
                    <div className="doc-tile">
                        <div className="doc-tile-icon">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 3v2h6V3M9 10h6M9 14h6M9 18h3" /></svg>
                        </div>
                        <span className="doc-tile-name">Listing form</span>
                    </div>
                </div>
            </div>

            <div className="about-section">
                <h2 className="about-heading">Built to extend</h2>
                <p className="about-body about-highlight">
                    Docket isn't locked to these four types. The pipeline is built around parsers: each document type is a small module that knows how to pull fields out of that layout, registered against a label for that type. Point Docket at a new kind of form, plug in a parser for it, and it works the same way. Same detection flow, same JSON output, and no changes to the core pipeline.
                </p>
            </div>

            <div className="about-section">
                <h2 className="about-heading">How it works</h2>
                <ol className="steps-list">
                    <li>Upload a document</li>
                    <li>Docket detects the document type automatically</li>
                    <li>Text is extracted using OCR when the file isn't already text based</li>
                    <li>Fields are parsed and returned as structured JSON</li>
                </ol>
            </div>

        </div>
    )
}

export default AboutPage