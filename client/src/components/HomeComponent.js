import React,{Component} from 'react';

class Home extends Component {

    constructor(props){
        super(props);
        this.state={
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
      }

render(){
    return(
        <div className="container mt-4 home text-center align-self-center">
        <br/><br/><br/><br/>
            <div className="row mt-3 darkbg text-center justify-content-center">

            <h1 align="center"> <br/>Chào mừng bạn ghé thăm The Friday Library</h1>
            </div>
            <div className="row darkbg">

        
        <br/><br/><br/>
            <h6>
            The Friday Library (thuộc Đại học Quốc gia TP. Hồ Chí Minh) cung cấp hỗ trợ học tập và nghiên cứu trực tiếp cho tất cả khoa về nhiều lĩnh vực chuyên ngành khác nhau. 
            The Friday Library là một thư viện tự động về tổ chức và quản lý, phát triển theo hướng xây dựng thư viện truyền thống - thư viện hiện đại - thư viện số. Đồng thời, TFL ứng dụng công nghệ thông tin để lưu giữ, khai thác tài nguyên thông tin.
             
            <br/><br/> </h6>
            </div>
            <div className="row darkbg justify-content-center">
            <table>
    <tr> <th colspan="2"><h6>Thời gian hoạt động</h6></th> </tr>
    <tr> <td><h6>Giờ mở cửa</h6> </td> <td> <h6>08:30 (sáng)</h6></td></tr>
    <tr> <td><h6>Giờ đóng cửa</h6> </td> <td><h6> 20:30 (tối)</h6></td></tr>
            </table>
            <br/>
            <br/>
                </div>
                <br/><br/>
                <br/><br/><br/>
            </div>
        );
}

}

export default Home;