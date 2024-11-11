const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// 配置MySQL連接
const db = mysql.createConnection({
    host: 'MySQL91',  // 你的MySQL主機
    user: 'root',       // 你的MySQL用戶名
    password: 'eric1234',       // 你的MySQL密碼
    database: '衝浪教練資料庫'  // 你的資料庫名稱
});

// 連接到資料庫
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// 配置Express中間件
app.use(bodyParser.json());

// API路徑，用來接收前端的篩選請求
app.post('/filter-coaches', (req, res) => {
    const { location, gender, board_type } = req.body;

    // 構建篩選的SQL查詢語句
    let sql = 'SELECT * FROM coaches WHERE 1=1';
    if (location) {
        sql += ` AND location = '${location}'`;
    }
    if (gender) {
        sql += ` AND gender = '${gender}'`;
    }
    if (board_type) {
        sql += ` AND board_type = '${board_type}'`;
    }

    // 執行查詢
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results); // 返回符合條件的教練資料
    });
});

// 啟動伺服器
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
