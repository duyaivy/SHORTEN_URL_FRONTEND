Yêu cầu: Đóng vai một chuyên gia DevOps và Fullstack Developer. Hãy viết code, script cấu hình Docker và CI/CD cho hệ thống của tôi dựa trên kiến trúc dưới đây.

1. Thông tin kho lưu trữ mã nguồn (Source Code Repositories):
   Dự án được chia làm 2 repository riêng biệt trên GitHub:

Repo Frontend: SHORTEN_URL_FRONTEND

Repo Backend: SHORTEN_URL

2. Kiến trúc hệ thống (Triển khai trên 2 VPS):

VPS 1 (IP: [Nhập_IP_VPS1]): Chạy 2 Docker container thông qua Docker Compose (Kéo image GHCR).

Container 1 (Frontend + Nginx): Sử dụng multi-stage build. Nginx phục vụ file tĩnh của shortlink_frontend và đồng thời làm Load Balancer (Reverse Proxy).

Container 2 (Backend - Node 1): Chạy source code của shortlink.

VPS 2 (IP: [Nhập_IP_VPS2]): Chạy 1 Docker container thông qua Docker Compose.

Container 1 (Backend - Node 2): Chạy source code của shortlink (giống hệt Node 1).

Database & Cache: Cả 2 Node BE đều trỏ chung về một Database và Redis (dùng biến môi trường).

3. Cơ chế Load Balancing & Định tuyến (Nginx trên Container Frontend ở VPS 1):

Truy cập [domain.com/](https://domain.com/a/*) -> Nginx trả về ứng dụng React/Vue (Frontend).

Truy cập [domain.com/](https://api.domain.com/)... -> Nginx phân tải (Load Balance) 50/50 xuống cụm Backend gồm: Node 1 (localhost:3000) và Node 2 (IP_VPS2:3000).
Truy cập [domain.com/](https://domain.com/*)... -> Nginx gọi đến api của backend nhưng thay đổi thành https://api.domain.com/view/* để redirect đến api get shortlink.

4. Ràng buộc mã nguồn Backend (Cần lưu ý khi sinh cấu hình):

Stateless: Hệ thống phải là Stateless. Phải sử dụng JWT cho Authentication hoặc lưu Session trên Redis để đồng bộ giữa 2 VPS.

CORS: Backend phải cho phép domain thực tế của Frontend gọi API.

5. Nhiệm vụ của bạn (Các output tôi cần bạn tạo ra):

Hạ tầng Docker:

File docker-compose.yml đặt trên VPS 1 (chạy FE và BE Node 1).

File docker-compose.yml đặt trên VPS 2 (chạy BE Node 2).

File nginx.conf hoàn chỉnh tích hợp vào Dockerfile của Frontend để làm Load Balancer.

CI/CD (Vì có 2 repo nên cần 2 workflow riêng biệt):

File .github/workflows/deploy.yml cho repo shortlink_frontend: Build image FE, push lên Registry, SSH vào VPS 1 để cập nhật riêng container Frontend.

File .github/workflows/deploy.yml cho repo shortlink: Build image BE, push lên Registry, SSH vào cả VPS 1 và VPS 2 để cập nhật container Backend mà không làm gián đoạn Frontend.

Biến môi trường: tự đọc trong .env.example để setup, tôi sẽ dùng nó trong github secrets thay vì file .env như hiện tại.
