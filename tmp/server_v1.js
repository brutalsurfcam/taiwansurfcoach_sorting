const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();


// 配置MySQL連接
const db = mysql.createConnection({
    host: 'localhost',  // 你的MySQL主機
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
    // 打印從前端接收的篩選條件
    console.log('接收到的篩選條件:', req.body);

    // 從請求中提取篩選條件
    const { location, gender, board_type } = req.body;

    // 構建篩選的SQL查詢語句
    let sql = 'SELECT * FROM 教練資料 WHERE 1=1';  // 教練資料 是 table 名稱
    if (location) {
        sql += ` AND location = '${location}'`;
    }
    if (gender) {
        sql += ` AND gender = '${gender}'`;
    }
    if (board_type) {
        sql += ` AND board_type = '${board_type}'`;
    }

    // 打印查詢語句以便於調試
    console.log('執行的SQL查詢:', sql);

    // 執行查詢
    db.query(sql, (err, results) => {
        if (err) {
            console.error('資料庫查詢失敗:', err);
            return res.status(500).send('伺服器錯誤');
        }

        // 打印查詢結果以便於調試
        console.log('查詢結果:', results);

        // 返回符合篩選條件的教練資料
        res.json(results);
    });
});

// 啟動伺服器
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
