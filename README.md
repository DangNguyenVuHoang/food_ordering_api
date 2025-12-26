# Food Ordering API (Sequelize practice)

## Cách chạy

1. Import file `food_ordering.sql` vào MySQL (database `food_ordering`)
2. Vào thư mục project:
   ```bash
   npm install
   npm start
   ```
3. Test API:

     Test API LIKE nhà hàng:
   - POST `http://localhost:3000/api/likes`
     Body JSON:
     {
     "user_id": 1,
     "res_id": 1
     }
     Test UNLIKE:
   - DELETE `http://localhost:3000/api/likes`
     Body JSON:
     {
     "user_id": 1,
     "res_id": 1
     }
     Test lấy danh sách LIKE theo USER:
   - GET `http://localhost:3000/api/likes/by-user/1`
     Test lấy danh sách LIKE theo nhà hàng:
   - GET `http://localhost:3000/api/likes/by-res/1`
     Add hoặc Update Rate:
   - POST `http://localhost:3000/api/rates`
     Body JSON:
     {
     "user_id": 1,
     "res_id": 1,
     "amount": 5
     }
     Lấy danh sách đánh giá theo USER:
   - GET `http://localhost:3000/api/rates/by-user/1`
     Lấy danh sách đánh giá theo RESTAURANT:
   - GET `http://localhost:3000/api/rates/by-res/1`
     Tạo order:
   - POST `http://localhost:3000/api/orders`
     Body JSON:
     {
     "user_id": 1,
     "food_id": 1,
     "amount": 2,
     "code": "ABC123",
     "arr_sub_id": "1,2"
     }
     Lấy danh sách order theo USER:
   - GET `http://localhost:3000/api/orders/by-user/1`
   
