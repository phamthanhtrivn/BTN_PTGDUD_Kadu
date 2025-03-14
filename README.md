# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Cài đặt thêm thư viện: 
npm install react-bootstrap
pm install swiper@latest
npm install lucide-react

giải thích sơ lược: 

ShopContextProvider là một wrapper bao quanh toàn bộ ứng dụng (thường được đặt trong App.jsx hoặc index.jsx). Nó cung cấp các giá trị (state và function) để các component con có thể truy cập mà không cần truyền prop qua nhiều cấp.


thay đổi từ code Product 
cách truyền dữ liẹu cũ: 
<ProductItem
  key={index}
  id={item.id}
  name={item.name}
  price={item.price}
  image={item.image}
/>
nhưng lại gọi nó ở trong ProductItems ->ProductItem mong đợi một prop duy nhất là product (một object chứa các thuộc tính như id, name, price, v.v.), nhưng bạn lại truyền các prop riêng lẻ (id, name, price, image). =>>  Điều này dẫn đến product trong ProductItem là undefined, gây ra lỗi Cannot destructure property 'id' of 'product' as it is undefined.

fix lại =  <ProductItem key={item.id} product={item} />  ===>>> Thay vì truyền các prop riêng lẻ, mình truyền toàn bộ object item dưới dạng prop product

fix lỗi 2 => thêm hàm khởi tạo filterProducts và thêm kiểm tra trong useEffect