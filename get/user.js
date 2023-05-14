
/**
 * Id값으로 사용자를 출력하는 함수
 * @param { query } query Query 바인딩 변수 
 * @param { number } id 사용자 아이디 
 * @returns 
 */
export const getUser = async (query, id) => {

    try {
        const rows = await query(`SELECT * FROM users WHERE id=${id}`);
        let data = JSON.parse(JSON.stringify(rows[0]));
        console.log(data);
        return data;
    } catch (error) {
        return null;
    }
}

/**
 * 모든 사용자 출력
 * @param { query } query Query 바인딩 변수
 * @returns 
 */
export const getAllUsers = async (query) => {
    try {
        const rows = await query('SELECT * FROM users');
        var dataList = [];
        for (var data of rows){
            dataList.push(JSON.parse(JSON.stringify(data)));
        };

        return dataList;
    } catch (error) {
        return null;
    }
}
