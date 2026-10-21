/* =========================
   1. DỮ LIỆU TÀI KHOẢN
   ========================= */

let danhSachTaiKhoan = [{
    taiKhoan: "khach1",
    matKhau: "123456"
}];

// Tài khoản đang đăng nhập
let nguoiDungHienTai = null;


/* =========================
   2. DỮ LIỆU SẢN PHẨM
   ========================= */

let danhSachSanPham = [
    { id: 1, ten: "Áo thun", gia: 150000 },
    { id: 2, ten: "Quần jean", gia: 300000 },
    { id: 3, ten: "Giày thể thao", gia: 500000 },
    { id: 4, ten: "Balo", gia: 250000 }
];

// Giỏ hàng lưu sản phẩm và số lượng
let gioHang = [];


/* =========================
   3. LẤY CÁC PHẦN TỬ HTML
   ========================= */

const oTaiKhoan = document.getElementById("oTaiKhoan");
const oMatKhau = document.getElementById("oMatKhau");
const thongBaoLoi = document.getElementById("thongBaoLoi");

const manHinhDangNhap =
    document.getElementById("manHinhDangNhap");

const manHinhCuaHang =
    document.getElementById("manHinhCuaHang");

const tenDangNhap =
    document.getElementById("tenDangNhap");

const bangSanPham =
    document.getElementById("bangSanPham");

const bangGioHang =
    document.getElementById("bangGioHang");

const tongTien =
    document.getElementById("tongTien");


/* =========================
   4. ĐĂNG KÝ
   ========================= */

function dangKy() {
    let taiKhoan = oTaiKhoan.value.trim();
    let matKhau = oMatKhau.value;

    if (taiKhoan === "" || matKhau === "") {
        thongBaoLoi.textContent =
            "Vui lòng nhập đầy đủ tài khoản và mật khẩu!";
        return;
    }

    // Kiểm tra tài khoản đã tồn tại
    let viTri = danhSachTaiKhoan.findIndex(
        tk => tk.taiKhoan === taiKhoan
    );

    if (viTri !== -1) {
        thongBaoLoi.textContent =
            "Tài khoản đã tồn tại!";
        return;
    }

    if (matKhau.length < 6) {
        thongBaoLoi.textContent =
            "Mật khẩu phải có ít nhất 6 ký tự!";
        return;
    }

    danhSachTaiKhoan.push({
        taiKhoan: taiKhoan,
        matKhau: matKhau
    });

    thongBaoLoi.style.color = "green";
    thongBaoLoi.textContent =
        "Đăng ký thành công! Bạn có thể đăng nhập.";

    oMatKhau.value = "";
}


/* =========================
   5. ĐĂNG NHẬP
   ========================= */

function dangNhap() {
    let taiKhoan = oTaiKhoan.value.trim();
    let matKhau = oMatKhau.value;

    if (taiKhoan === "" || matKhau === "") {
        thongBaoLoi.style.color = "red";
        thongBaoLoi.textContent =
            "Vui lòng nhập tài khoản và mật khẩu!";
        return;
    }

    let taiKhoanTimThay = danhSachTaiKhoan.find(
        tk =>
        tk.taiKhoan === taiKhoan &&
        tk.matKhau === matKhau
    );

    if (taiKhoanTimThay === undefined) {
        thongBaoLoi.style.color = "red";
        thongBaoLoi.textContent =
            "Tài khoản hoặc mật khẩu không đúng!";
        return;
    }

    nguoiDungHienTai = taiKhoanTimThay;

    tenDangNhap.textContent =
        nguoiDungHienTai.taiKhoan;

    thongBaoLoi.textContent = "";

    manHinhDangNhap.style.display = "none";
    manHinhCuaHang.style.display = "block";

    hienThiSanPham();
    hienThiGioHang();
}


/* =========================
   6. ĐĂNG XUẤT
   ========================= */

function dangXuat() {
    nguoiDungHienTai = null;

    manHinhCuaHang.style.display = "none";
    manHinhDangNhap.style.display = "block";

    oTaiKhoan.value = "";
    oMatKhau.value = "";

    thongBaoLoi.style.color = "red";
    thongBaoLoi.textContent = "";
}


/* =========================
   7. HIỂN THỊ SẢN PHẨM
   ========================= */

function hienThiSanPham() {
    let html = "";

    for (let i = 0; i < danhSachSanPham.length; i++) {
        let sp = danhSachSanPham[i];

        html += `
      <tr>
        <td>${sp.ten}</td>
        <td>${sp.gia.toLocaleString("vi-VN")}đ</td>
        <td>
          <button onclick="themVaoGio(${sp.id})">
            Thêm vào giỏ
          </button>
        </td>
      </tr>
    `;
    }

    bangSanPham.innerHTML = html;
}


/* =========================
   8. THÊM SẢN PHẨM VÀO GIỎ
   ========================= */

function themVaoGio(id) {
    let sanPham = danhSachSanPham.find(
        sp => sp.id === id
    );

    if (!sanPham) {
        return;
    }

    let sanPhamTrongGio = gioHang.find(
        sp => sp.id === id
    );

    if (sanPhamTrongGio) {
        sanPhamTrongGio.soLuong++;
    } else {
        gioHang.push({
            id: sanPham.id,
            ten: sanPham.ten,
            gia: sanPham.gia,
            soLuong: 1
        });
    }

    hienThiGioHang();
}


/* =========================
   9. HIỂN THỊ GIỎ HÀNG
   ========================= */

function hienThiGioHang() {
    let html = "";
    let tong = 0;

    if (gioHang.length === 0) {
        bangGioHang.innerHTML = "<p>Giỏ hàng đang trống.</p>";
        tongTien.textContent = "0đ";
        return;
    }

    for (let i = 0; i < gioHang.length; i++) {
        let sp = gioHang[i];
        let thanhTien = sp.gia * sp.soLuong;

        tong += thanhTien;

        html += `
      <div class="san-pham-gio">
        <p><b>${sp.ten}</b></p>
        <p>Đơn giá: ${sp.gia.toLocaleString("vi-VN")}đ</p>
        <p>
          Số lượng:
          <button onclick="doiSoLuong(${sp.id}, -1)">-</button>
          ${sp.soLuong}
          <button onclick="doiSoLuong(${sp.id}, 1)">+</button>
        </p>
        <p>Thành tiền: ${thanhTien.toLocaleString("vi-VN")}đ</p>
        <button onclick="xoaKhoiGio(${sp.id})">Xóa</button>
        <hr>
      </div>
    `;
    }

    bangGioHang.innerHTML = html;
    tongTien.textContent = tong.toLocaleString("vi-VN") + "đ";
}


/* =========================
   10. THAY ĐỔI SỐ LƯỢNG
   ========================= */

function doiSoLuong(id, thayDoi) {
    let sp = gioHang.find(item => item.id === id);

    if (!sp) {
        return;
    }

    sp.soLuong += thayDoi;

    if (sp.soLuong <= 0) {
        gioHang = gioHang.filter(item => item.id !== id);
    }

    hienThiGioHang();
}


/* =========================
   11. XÓA SẢN PHẨM KHỎI GIỎ
   ========================= */

function xoaKhoiGio(id) {
    gioHang = gioHang.filter(
        sp => sp.id !== id
    );

    hienThiGioHang();
}


/* =========================
   12. THANH TOÁN
   ========================= */

function thanhToan() {
    if (gioHang.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }

    let tong = gioHang.reduce(
        (sum, sp) => sum + sp.gia * sp.soLuong,
        0
    );

    let xacNhan = confirm(
        "Tổng thanh toán: " +
        tong.toLocaleString("vi-VN") +
        "đ\nBạn có muốn xác nhận thanh toán không?"
    );

    if (xacNhan) {
        alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");

        gioHang = [];
        hienThiGioHang();
    }
}