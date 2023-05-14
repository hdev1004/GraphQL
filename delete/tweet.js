/**
 * 글 정보 삭제
 * @param { query } query Query 바인딩 변수 
 * @param { number } id 작성 아이디 
 * @returns 
 */
export const deleteTweet = async (query, id) => {
    try {
        await query(`DELETE FROM writing where id=${id}`);
        return true
    } catch (error) {
        return false;
    }
}
