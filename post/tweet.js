/**
 * 글 정보 추가
 * @param { query } query Query 바인딩 변수
 * @param { string } text 작성 정보
 * @param { number } userId 작성항 사용자 아이디 정보 
 * @returns 
 */
export const postTweet = async (query, text, userId) => {
    try {
        await query(`INSERT INTO writing (text, userId) values ('${text}', ${userId})`);
        return true
    } catch (error) {
        return false;
    }
}
