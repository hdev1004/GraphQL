/**
 * 작성한 글 정보 출력
 * @param { query } query Query 바인딩 변수 
 * @param { number } id 작성 아이디 
 * @returns 
 */
export const getTweet = async (query, id) => {
    try {
        const rows = await query(`SELECT * FROM writing WHERE id=${id}`);
        let data = JSON.parse(JSON.stringify(rows[0]));
        console.log(data);
        return data;
    } catch (error) {
        return null;
    }
}


/**
 * 모든 작성 정보 출력
 * @param { query } query Query 바인딩 변수
 * @returns 
 */
export const getAllTweets = async (query) => {
    try {
        const rows = await query('SELECT * FROM writing');
        var dataList = [];
        for (var data of rows){
            dataList.push(JSON.parse(JSON.stringify(data)));
        };

        return dataList;
    } catch (error) {
        return null;
    }
}
