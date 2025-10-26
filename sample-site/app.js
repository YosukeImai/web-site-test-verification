// データストア（メモリ内に保持）
let dataStore = [];

// ページング設定
const ITEMS_PER_PAGE = 20;
let currentPage = 1;

// DOM要素の取得
const form = document.getElementById('dataForm');
const tableBody = document.getElementById('tableBody');
const emptyMessage = document.getElementById('emptyMessage');
const tableContainer = document.getElementById('tableContainer');
const pagination = document.getElementById('pagination');
const totalCountSpan = document.getElementById('totalCount');
const pageInfoSpan = document.getElementById('pageInfo');

// ボタン要素の取得
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const firstPageBtn = document.getElementById('firstPageBtn');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const lastPageBtn = document.getElementById('lastPageBtn');

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    setupEventListeners();
});

// イベントリスナーの設定
function setupEventListeners() {
    // フォーム送信
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit();
    });

    // リセットボタン
    resetBtn.addEventListener('click', () => {
        form.reset();
        clearErrors();
    });

    // ページングボタン
    firstPageBtn.addEventListener('click', () => goToPage(1));
    prevPageBtn.addEventListener('click', () => goToPage(currentPage - 1));
    nextPageBtn.addEventListener('click', () => goToPage(currentPage + 1));
    lastPageBtn.addEventListener('click', () => goToPage(getTotalPages()));

    // リアルタイムバリデーション
    document.getElementById('name').addEventListener('input', validateName);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('age').addEventListener('input', validateAge);
}

// フォーム送信処理
function handleFormSubmit() {
    // バリデーション
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isAgeValid = validateAge();

    if (!isNameValid || !isEmailValid || !isAgeValid) {
        return;
    }

    // データの取得
    const formData = {
        id: Date.now(),
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        age: parseInt(document.getElementById('age').value, 10),
        department: document.getElementById('department').value || '未設定',
        createdAt: new Date().toLocaleString('ja-JP')
    };

    // データストアに追加
    dataStore.push(formData);

    // フォームをリセット
    form.reset();
    clearErrors();

    // テーブルを再描画
    renderTable();

    // 最後のページに移動（新しいデータが追加されたページ）
    const totalPages = getTotalPages();
    if (totalPages > 0) {
        goToPage(totalPages);
    }

    // 成功メッセージ（オプション）
    showSuccessMessage('データを追加しました');
}

// 名前のバリデーション
function validateName() {
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    const value = nameInput.value.trim();

    if (value === '') {
        nameError.textContent = '名前は必須です';
        return false;
    } else if (value.length > 50) {
        nameError.textContent = '名前は50文字以内で入力してください';
        return false;
    } else {
        nameError.textContent = '';
        return true;
    }
}

// メールアドレスのバリデーション
function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const value = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === '') {
        emailError.textContent = 'メールアドレスは必須です';
        return false;
    } else if (!emailPattern.test(value)) {
        emailError.textContent = '有効なメールアドレスを入力してください';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

// 年齢のバリデーション
function validateAge() {
    const ageInput = document.getElementById('age');
    const ageError = document.getElementById('ageError');
    const value = ageInput.value;

    if (value === '') {
        ageError.textContent = '年齢は必須です';
        return false;
    }

    const age = parseInt(value, 10);

    if (isNaN(age) || age < 0) {
        ageError.textContent = '0以上の数値を入力してください';
        return false;
    } else if (age > 150) {
        ageError.textContent = '150以下の数値を入力してください';
        return false;
    } else {
        ageError.textContent = '';
        return true;
    }
}

// エラーメッセージのクリア
function clearErrors() {
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('ageError').textContent = '';
}

// テーブルの描画
function renderTable() {
    const totalItems = dataStore.length;
    totalCountSpan.textContent = `全 ${totalItems} 件`;

    // データが0件の場合
    if (totalItems === 0) {
        emptyMessage.style.display = 'block';
        tableContainer.style.display = 'none';
        pagination.style.display = 'none';
        return;
    }

    // データがある場合
    emptyMessage.style.display = 'none';
    tableContainer.style.display = 'block';

    // ページング表示の判定
    if (totalItems > ITEMS_PER_PAGE) {
        pagination.style.display = 'flex';
    } else {
        pagination.style.display = 'none';
    }

    // 現在のページのデータを取得
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const pageData = dataStore.slice(startIndex, endIndex);

    // テーブルボディをクリア
    tableBody.innerHTML = '';

    // データ行を追加
    pageData.forEach((item, index) => {
        const row = document.createElement('tr');
        const globalIndex = startIndex + index + 1;

        row.innerHTML = `
            <td>${globalIndex}</td>
            <td>${escapeHtml(item.name)}</td>
            <td>${escapeHtml(item.email)}</td>
            <td>${item.age}</td>
            <td>${escapeHtml(item.department)}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteItem(${item.id})" aria-label="削除">
                    削除
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    // ページング情報を更新
    updatePagination();
}

// ページング情報の更新
function updatePagination() {
    const totalPages = getTotalPages();

    pageInfoSpan.textContent = `${currentPage} / ${totalPages}`;

    // ボタンの有効/無効を設定
    firstPageBtn.disabled = currentPage === 1;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage >= totalPages;
    lastPageBtn.disabled = currentPage >= totalPages;
}

// 総ページ数を取得
function getTotalPages() {
    return Math.ceil(dataStore.length / ITEMS_PER_PAGE);
}

// ページ移動
function goToPage(page) {
    const totalPages = getTotalPages();

    if (page < 1 || page > totalPages) {
        return;
    }

    currentPage = page;
    renderTable();
}

// データ削除
function deleteItem(id) {
    if (!confirm('このデータを削除しますか?')) {
        return;
    }

    // データストアから削除
    dataStore = dataStore.filter(item => item.id !== id);

    // 現在のページにデータがなくなった場合、前のページに移動
    const totalPages = getTotalPages();
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    } else if (totalPages === 0) {
        currentPage = 1;
    }

    // テーブルを再描画
    renderTable();

    // 削除メッセージ
    showSuccessMessage('データを削除しました');
}

// HTML エスケープ
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 成功メッセージの表示
function showSuccessMessage(message) {
    // 既存のメッセージがあれば削除
    const existingMessage = document.querySelector('.success-toast');
    if (existingMessage) {
        existingMessage.remove();
    }

    // トーストメッセージを作成
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.textContent = message;

    // スタイルを設定
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    // アニメーションのスタイルを追加
    if (!document.querySelector('#toast-animation-style')) {
        const style = document.createElement('style');
        style.id = 'toast-animation-style';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // 3秒後に削除
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// テストデータ生成（開発/テスト用）
function generateTestData(count = 25) {
    const names = ['山田太郎', '佐藤花子', '鈴木一郎', '田中美咲', '高橋健太', '渡辺さくら', '伊藤翔太', '中村優子', '小林大輔', '加藤愛'];
    const departments = ['開発', '営業', '人事', '総務', '経理'];

    for (let i = 0; i < count; i++) {
        dataStore.push({
            id: Date.now() + i,
            name: names[i % names.length] + (i > 9 ? ` ${Math.floor(i / 10)}` : ''),
            email: `user${i + 1}@example.com`,
            age: Math.floor(Math.random() * 50) + 20,
            department: departments[i % departments.length],
            createdAt: new Date().toLocaleString('ja-JP')
        });
    }

    renderTable();
}

// グローバルスコープに公開（コンソールからテスト用）
window.generateTestData = generateTestData;
window.deleteItem = deleteItem;
