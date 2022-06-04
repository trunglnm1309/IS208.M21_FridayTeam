import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import Loading from './LoadingComponent';

const required = (val) => val && val.length;
const requiredNum = (val) => !!(val);
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const maxVal = (len) => (val) => !(val) || (val <= len);
const minVal = (len) => (val) => (val) && (val >= len);
const isNumber = (val) => !isNaN(Number(val));

class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        let uniqueIsbn = (val) => (!this.props.books.some((book) => (book.isbn === val)))
        let uniqueName = (val) => (!this.props.books.some((book) => (book.name === val)))

        if (this.props.booksLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.booksErrMess) {
            return (
                <div className="container loading">
                    <div className="row heading">
                        <div className="col-12">
                            <br /><br /><br /><br />
                            <h3>{this.props.booksErrMess}</h3>
                        </div>
                    </div>
                </div>
            );
        }
        else
            return (
                <div className="container">
                    <div className="row justify-content-center heading">
                        <div className="col-12">
                            <h3 align="center">  Thêm sách</h3>
                        </div>
                    </div>
                    <div className="row row-content justify-content-center">
                        <LocalForm onSubmit={(values) => {
                            this.props.postBook(values.name, values.author, values.description, values.isbn, values.cat, values.floor, values.shelf, values.copies);
                        }}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Tên sách </Label>
                                <Col md={4}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Tên sách"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), uniqueName
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu:',
                                            minLength: ' Phải nhiều hơn 2 ký tự.',
                                            uniqueName: ' Tên sách này đã tồn tại.'
                                        }}
                                    />
                                </Col>
                                <Label htmlFor="author" md={2}>Tác giả </Label>
                                <Col md={4}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Tên tác giả"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu:',
                                            minLength: ' Phải nhiều hơn 2 ký tự.'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="isbn" md={2}>Mã số sách</Label>
                                <Col md={4}>
                                    <Control.text model=".isbn" id="isbn" name="isbn"
                                        placeholder="Mã số sách ISBN"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(10), maxLength: maxLength(13), isNumber,
                                            uniqueIsbn
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".isbn"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu:',
                                            minLength: ' Phải nhiều hơn 9 chữ số.',
                                            maxLength: ' Tối đa 13 chữ số hoặc ít hơn.',
                                            isNumber: ' Phải là chữ số.',
                                            uniqueIsbn: ' Mã ISBN này đã tồn tại!'
                                        }}
                                    />
                                </Col>
                                <Label htmlFor="copies" md={3}> Số lượng hiện có</Label>
                                <Col md={3}>
                                    <Control.text model=".copies" id="copies" name="copies"
                                        placeholder="Số lượng hiện có"
                                        className="form-control"
                                        validators={{
                                            requiredNum, minVal: minVal(1), maxVal: maxVal(1000), isNumber
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".copies"
                                        show="touched"
                                        messages={{
                                            requiredNum: 'Yêu cầu:',
                                            minVal: ' Số lượng lớn hơn 0.',
                                            maxVal: ' Tối đa 1000 hoặc ít hơn.',
                                            isNumber: ' Phải là chữ số.'
                                        }}
                                    />
                                </Col>
                            </Row>


                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="cat">Thể loại</Label>
                                    <Control.select defaultValue="Romance" model=".cat" id="cat" className="form-control">
                                        <option value="Romance">Ngôn tình</option> <option value="Technology">Kỹ thuật</option>
                                        <option value="Computer Science">Công nghệ Thông tin</option> <option value="Management">Quản lý</option>
                                        <option value="Electronics">Điện tử</option> <option value="Physics">Vật lý</option>
                                        <option value="Chemistry">Hóa học</option> <option value="Mathematics">Toán học</option>
                                        <option value="Fiction">Khoa học Viễn tưởng</option> <option value="Philosophy">Triết học</option>
                                        <option value="Language">Ngôn ngữ</option> <option value="Arts">Nghệ thuật</option>
                                        <option value="Other">Khác</option>

                                    </Control.select>
                                </Col>
                                <Col>
                                    <Label htmlFor="floor">Tầng </Label>
                                    <Control.select defaultValue={0} model=".floor" id="floor"
                                        className="form-control" >
                                        <option>0</option> <option>1</option>
                                        <option>2</option> <option>3</option>
                                        <option>4</option> <option>5</option>
                                        <option>6</option> <option>7</option>
                                        <option>8</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group text-center justify-content-center">
                                <Label htmlFor="shelf" md={3}> Kệ</Label>
                                <Col md={6}>
                                    <Control.text model=".shelf" id="shelf" name="shelf"
                                        placeholder="Mã số của kệ chứa sách"
                                        className="form-control"
                                        validators={{
                                            requiredNum, minVal: minVal(1), maxVal: maxVal(100), isNumber
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".shelf"
                                        show="touched"
                                        messages={{
                                            requiredNum: 'Yêu cầu:',
                                            minVal: ' Số lượng lớn hơn 0.',
                                            maxVal: ' Tối đa 1000 hoặc ít hơn.',
                                            isNumber: ' Phải là chữ số.'
                                        }}
                                    />
                                </Col>
                            </Row>


                            <Row className="form-group">
                                <Label htmlFor="description" md={2}>Mô tả</Label>
                                <Col md={10}>
                                    <Control.textarea model=".description" id="description" name="description"
                                        rows="12"
                                        placeholder="Một số mô tả về sách..."
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="align-self-center">
                                <Col className="text-center">
                                    <Button type="submit" className="bg-primary">
                                        Xác nhận
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                    <br />
                </div>
            );

    }

}

export default AddBook;