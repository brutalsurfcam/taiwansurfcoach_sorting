const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // 引入 CORS
const app = express();

// 配置 CORS
app.use(cors()); // 允許所有來源的請求

// 配置 MySQL 連接
const db = mysql.createConnection({
    host: 'localhost',  // MySQL 主機
    user: 'root',       // MySQL 用戶名
    password: 'eric1234',       // MySQL 密碼
    database: '衝浪教練資料庫'  // 資料庫名稱
});

// 連接到資料庫
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// 配置 Express 中間件
app.use(bodyParser.json());

// API 路徑，用來接收前端的篩選請求
app.post('/filter-coaches', (req, res) => {
    console.log('接收到的篩選條件:', req.body);

    // 從請求中提取篩選條件
    const { location, gender, board_type } = req.body;

    // 構建篩選的 SQL 查詢語句
    let sql = 'SELECT * FROM 教練資料 WHERE 1=1';
    if (location) {
        sql += ` AND 地區 = '${location}'`; // 將 location 對應到資料庫的「地區」
    }
    if (gender) {
        sql += ` AND 性別 = '${gender}'`;
    }
    if (board_type) {
        sql += ` AND 衝浪板類型 = '${board_type}'`;
    }

    console.log('執行的 SQL 查詢:', sql);

    // 執行查詢
    db.query(sql, (err, results) => {
        if (err) {
            console.error('資料庫查詢失敗:', err);
            return res.status(500).send('伺服器錯誤');
        }

        console.log('查詢結果:', results);
        res.json(results);
    });
});

// 啟動伺服器
app.listen(8080, () => { // 使用 8080 埠
    console.log('Server started on port 8080');
});
