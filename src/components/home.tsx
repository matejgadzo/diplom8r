import "../App.scss";
function Home() {
    return (
        <div className="container">
            <h1 className="title">Upload a document you want to sign</h1>
            <div className="uploadArea">
                <input type="file" />
            </div>
        </div>
    );
}
export default Home;