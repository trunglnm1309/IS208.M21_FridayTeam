import React,{Component} from 'react';
import { Table } from 'reactstrap';
import {Link} from 'react-router-dom';
import Loading from './LoadingComponent.js';

// RenderBook is a functional component
function RenderBook ({book, changeSelected ,isAdmin, toggleDeleteModal,toggleEditModal,i}) {
    return (
            <React.Fragment>
            <td>
            {i}
            </td>
            <td>
            <Link to={`/books/${book._id}`}>
            {book.name}
            </Link>
            </td>
            <td>
            {book.isbn}
            </td>
            <td>
                {book.author}
            </td>
            <td>
                {book.copies}
            </td>
            {isAdmin?(<td><span onClick={()=>{changeSelected(book._id); toggleEditModal(); }} className="Option fa fa-pencil"/>
                          &nbsp; &nbsp; <span onClick={()=>{changeSelected(book._id); toggleDeleteModal();}} className="Option fa fa-trash"/>
                        </td>):(<React.Fragment/>)}
            </React.Fragment>
       );
}


class Booklist extends Component {

    constructor(props){
        super(props);
        this.state={
        }
        this.i=1;
    }


    componentDidMount() {
        window.scrollTo(0, 0)
      }
      
render(){
    const list = this.props.books.map((book) => {
        return (
                <tr key={book.name}>
                    <RenderBook book={book} isAdmin={this.props.isAdmin} changeSelected={this.props.changeSelected}
                    toggleDeleteModal={this.props.toggleDeleteModal}
                    toggleEditModal={this.props.toggleEditModal}
                    i={this.i++}
                    />
                </tr>
        );
    });

    if (this.props.booksLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (this.props.booksErrMess) {
        return(
            <div className="container loading">
                <div className="row heading"> 
                    <div className="col-12">
                        <br/><br/><br/><br/>
                        <h3>{this.props.booksErrMess}</h3>
                    </div>
                </div>
            </div>
        );
    }
    else
    {
    return(
        
        <div className="container">
        <div className="row">
            <div className="col-12 heading">
             <h3 align="center">Danh sách sách tại thư viện</h3>
             <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sách</th>
            <th>Mã số sách ISBN</th>
            <th>Tác giả</th>
            <th>Số lượng hiện có</th>
            {this.props.isAdmin?(<th>Sửa / <br/>Xóa</th>):(<React.Fragment/>)}
          </tr>
        </thead>
        <tbody>
            {list}
        </tbody>
        </Table>
            </div>
        </div>
    </div>

        );
}
}

}

export default Booklist;