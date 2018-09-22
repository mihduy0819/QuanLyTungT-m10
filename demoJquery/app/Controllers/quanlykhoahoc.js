$(document).ready(function () {
    var dsKhoaHoc = new DanhSachKhoaHoc();
    var svKhoaHoc = new KhoaHocService();
    var svNguoiDung = new NguoiDungService();

    // Goi phuong thuc tu service qua api
    svKhoaHoc.LayDanhSachKhoaHoc()
        .done(function (data) {
            dsKhoaHoc.MangKhoaHoc = data;
            LoadDanhSachKhoaHoc(dsKhoaHoc.MangKhoaHoc);
        })
        .fail(function (error) {
            console.log(error);
        });
    // load noi dung cho nguoi dung tao
    svNguoiDung.LayDanhSachNguoiDung().done(function (MangNguoiDung) {
        LoadSelectNguoiDung(MangNguoiDung);
    })
        .fail(function (error) {
            console.log(error);
        });
    function LoadSelectNguoiDung(MangNguoiDung) {
        var noiDungSelect = "";
        MangNguoiDung.map(function (nguoiDung, index) {
            if (nguoiDung.MaLoaiNguoiDung == "GV") {
                noiDungSelect += `
                    <option value="${nguoiDung.TaiKhoan}">${nguoiDung.HoTen}</option>
                `;
            }
        });
        $("#NguoiTao").html(noiDungSelect);
    }
    function LoadDanhSachKhoaHoc(MangKhoaHoc) {
        var noiDungTable = ``;
        //index la vi tri phan tu trong mang
        //khoahoc la doi tuong trong mang
        MangKhoaHoc.map(function (khoahoc, index) {
            var moTa = khoahoc.MoTa;
            if (khoahoc.MoTa != null) {
                khoahoc.MoTa.length >= 100 ? moTa = khoahoc.MoTa.substring(0, 100) : moTa = khoahoc.MoTa;
            }
            noiDungTable += `
                <tr>
                    <td></td>
                    <td>${khoahoc.MaKhoaHoc}</td>
                    <td>${khoahoc.TenKhoaHoc}</td>
                    <td>${khoahoc.MoTa}...</td>
                    <td><img src='${khoahoc.HinhAnh}' width="75" height="50"/></td>
                    <td>${khoahoc.NguoiTao}</td>
                    <td><button class="btn btn-success btnChinhSua" makhoahoc="${khoahoc.MaKhoaHoc}">Chĩnh Sửa</button></td>
                    <button class="btn btn-danger btnXoa" taikhoan="${khoahoc.MaKhoaHoc}">Xóa</button> 

                </tr>
            `;
        })
        $("#tblDanhSachKhoaHoc").html(noiDungTable);
    }

    // Them khoa hoc
    $('#btnThemKhoaHoc').click(function () {
        $("#btnModal").trigger('click');
        $('.modal-title').html('Thêm khóa học');
        var modalFooter = `
        <button class="btn btn-success" id="btnThemKH">Thêm khóa học</button>
        <button class="btn btn-dark" data-dismiss="modal">Hủy</button>
    `
        $('.modal-footer').html(modalFooter);
        //Clear dữ liệu input
        $('.modal-body input').val('');

        $('body').delegate('#btnThemKH', 'click', function() {
            var khoaHoc = new KhoaHoc();
            khoaHoc.MaKhoaHoc = $('#MaKhoaHoc').val();
            khoaHoc.TenKhoaHoc = $('#TenKhoaHoc').val();
            khoaHoc.MoTa = $('#MoTa').val();
            khoaHoc.LuotXem = $('#LuotXem').val();
            khoaHoc.NguoiTao = $('#NguoiTao').val();

            svKhoaHoc.ThemKhoaHoc(khoaHoc).done(function (data) {
                dsKhoaHoc.MangKhoaHoc = data;
                LoadDanhSachKhoaHoc(dsKhoaHoc.MangKhoaHoc);
            }).fail(function (loi) {
                console.log(loi)
            });
            $(".close").trigger('click');
        });
    });
    $('body').delegate('.btnChinhSua','click',function(){
        $("#btnModal").trigger('click');
        $('.modal-title').html('Cập nhật khóa học');
        var modalFooter = `
        <button class="btn btn-success" id="btnCapNhat">Cập nhật</button>
        <button class="btn btn-dark" data-dismiss="modal">Hủy</button>
    `
        $('.modal-footer').html(modalFooter);

        var MaKhoaHoc = $(this).attr('makhoahoc');
        var khoaHoc = dsKhoaHoc.LayThongTinKhoaHoc(MaKhoaHoc);
        if(khoaHoc != null){
            $('#MaKhoaHoc').val(khoaHoc.MaKhoaHoc);
            $('#TenKhoaHoc').val(khoaHoc.TenKhoaHoc);
            $('#MoTa').val(khoaHoc.MoTa);
            $('#LuotXem').val(khoaHoc.LuotXem);
            $('#NguoiTao').val(khoaHoc.NguoiTao);
            
        }
        $('body').delegate('#btnCapNhat', 'click', function () {
            var khoaHoc = new KhoaHoc();
            khoaHoc.MaKhoaHoc = $('#MaKhoaHoc').val();
            khoaHoc.TenKhoaHoc = $('#TenKhoaHoc').val();
            khoaHoc.MoTa = CKEDITOR.instances.MoTa.getData();
            khoaHoc.LuotXem = $('#LuotXem').val();
            khoaHoc.NguoiTao = $('#NguoiTao').val();

            svKhoaHoc.CapNhatKhoaHoc(khoaHoc).done(function (data) {
                location.reload(); //Cap nhat reload lai trang
            }).fail(function (loi) {
                console.log(loi)
            });
            $(".close").trigger('click');
        }); 
    });
    CKEDITOR.replace('MoTa');
})