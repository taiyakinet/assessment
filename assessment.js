'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
/**
 * 指定したHTML要素の子要素をすべて削除する
 * @param {HTMLElemnt}elementHTML要素
 */
function removeAllChildren(element){
while (element.firstChild){
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = ()=>{
    const userName = userNameInput.value;
   if (userName.length === 0) { // 名前が空の時は処理を終了する
     return;
    };
    //診断結果表示エリアの作成
　 removeAllChildren(resultDivided);
   removeAllChildren(tweetDivided);

    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('あなたへのおススメダム')
    + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたへのおススメダム診断';
    tweetDivided.appendChild(anchor);
    
    twttr.widgets.load();
};
userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
      // TODO ボタンのonclick() 処理を呼び出す
      assessmentButton.onclick();
    }
  };
const answers = [
    '{userName}へのおススメダムは　　です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}へのおススメダムは　　です。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}へのおススメダムは　　です。{userName}の情熱に周りの人は感化されま。',
    '{userName}へのおススメダムは　　です。{userName}の厳しさがものごとをいつも成功に導きま。',
    '{userName}へのおススメダムは　　です。博識な{userName}を多くの人が頼りにしいます。',
    '{userName}へのおススメダムは　　です。{userName}だけのその特徴が皆を楽しくさせま。',
    '{userName}へのおススメダムは　　です。{userName}の洞察に、多くの人が助けらます。',
    '{userName}へのおススメダムは　　です。内側から溢れ出る{userName}の良さに皆が気を惹れます。',
    '{userName}へのおススメダムは　　です。{userName}がする決断にいつも助けられる人います。',
    '{userName}へのおススメダムは　　です。{userName}に気をかけてもらった多くの人が感謝しいます。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string}usernameユーザーの名前
 * @returns{string}診断結果
 */
function assessment(userName){
    //全文字足し合わせる
    let sumofCharCode = 0;
    for (let i=0; i < userName.length; i++){
        sumofCharCode =sumofCharCode + userName.charCodeAt(i);     
    }
    const index = sumofCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g,userName);

    return result;
    console.assert(
        assessment(userName) === assessment(userName),
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
      );
}
　
