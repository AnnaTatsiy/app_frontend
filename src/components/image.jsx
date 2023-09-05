import {Component} from "react";
import axios from "axios";

export default class Image extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: "",
            responseMsg: {
                status: "",
                message: "",
                error: "",
            },
        };
    }

    // image onchange hander
    handleChange = (e) => {
        let image = null;
        image = e.target.files[0];

        this.setState({
            image: image,
        });
    };

    // submit handler
    submitHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append("image", this.state.image);

        if (data.get('image') === '') {
            data = null
        }

        axios.post("http://127.0.0.1:8000/api/upload", data, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': 'api/*',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        responseMsg: {
                            status: response.data.status,
                            message: response.data.message,
                            error: response.data.error
                        },
                    });
                    setTimeout(() => {
                        this.setState({
                            image: "",
                            responseMsg: "",
                        });
                    }, 100000);

                    // getting uploaded images
                    this.props.getImage();

                    document.querySelector("#imageForm").reset();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return (
            <div className="container ms-5 me-5">
                <div className="row ms-5 me-5">
                    <div className="col-lg-11">
                        <form onSubmit={this.submitHandler} encType="multipart/form-data" id="imageForm">
                            <div className="div">

                                <div className="form-group py-2">
                                    <label htmlFor="images" className={"ms-1 mb-3 fs-5"}>Загрузить фото профиля:</label>
                                    <input
                                        type="file"
                                        name="image"
                                        multiple
                                        onChange={this.handleChange}
                                        className="form-control"
                                    />
                                    <div className="text-danger mt-2 ms-1">
                                        {this.state.responseMsg.status === "successs" ? (
                                            <div>
                                                {this.state.responseMsg.error}
                                            </div>
                                        ) : this.state.responseMsg.status === "failed" ? (
                                            <div>
                                                {this.state.responseMsg.error}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>

                                <div className={"d-flex justify-content-end"}>
                                    <button type="submit" className="btn btn-success">
                                        Отправить
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}