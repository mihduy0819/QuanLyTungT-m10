function KhoaHocService(){
    this.LayDanhSachKhoaHoc = function(){
        var apiURL = 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc';
        return $.ajax({
            url:apiURL,
            type:"GET",
            dataType:"json"
        });
    }
    this.ThemKhoaHoc = function(khoaHoc){
        var apiURL = 'http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc';
        return $.ajax({
            url: apiURL,
            type: "post",
            dataType: "json",
            data: khoaHoc
        });
    }
    this.CapNhatKhoaHoc = function(khoahoc){
    // var ngd = JSON.stringify({MaKhoaHoc: id, TenKhoaHoc: name, MoTa: des, LuotXem: luotxem, NguoiTao: creater});
        urlAPI= 'http://sv.myclass.vn/api/QuanLyTrungTam/capnhatkhoahoc';
        return $.ajax({
            url: urlAPI,
            type: 'put',
            dataType: 'json',
            data: khoahoc,
            // contentType: 'application/json'
        })
    }
}