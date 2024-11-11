const mysql = require('mysql2');
const fs = require('fs');

// 連接到 MySQL 資料庫
const connection = mysql.createConnection({
    host: 'localhost',       // MySQL 主機
    user: 'root',            // MySQL 使用者名稱
    password: 'eric1234', // MySQL 密碼
    database: '衝浪教練資料庫' // 資料庫名稱
});

// 查詢資料表並將結果儲存為 JSON
connection.connect(err => {
    if (err) throw err;
    console.log("已連接到 MySQL 資料庫");

    const query = 'SELECT * FROM 教練資料'; // 替換為你的資料表名稱
    connection.query(query, (err, results) => {
        if (err) throw err;

        // 將查詢結果轉換為 JSON 字串
        const jsonData = JSON.stringify(results, null, 2);
        
        // 將 JSON 字串寫入檔案
        fs.writeFile('coaches.json', jsonData, (err) => {
            if (err) throw err;
            console.log("資料已成功匯出為 coaches.json");
        });
        connection.end();
    });
});