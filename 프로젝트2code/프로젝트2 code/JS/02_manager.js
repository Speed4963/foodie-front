   // ==================== 샘플 데이터 ====================
const restaurants = [
  { id: 1, name: '맛있는 갈비집', category: '한식', address: '서울 강남구 역삼동', rating: 4.5, status: 'active', image: '' },
  { id: 2, name: '스시 오마카세', category: '일식', address: '서울 서초구 반포동', rating: 4.8, status: 'active', image: '' },
  { id: 3, name: '양자강', category: '중식', address: '서울 종로구 명동', rating: 4.2, status: 'pending', image: '' },
  { id: 4, name: '피자헛', category: '양식', address: '서울 마포구 홍대', rating: 4.0, status: 'active', image: '' },
  { id: 5, name: '콩나물국밥', category: '한식', address: '서울 동대문구', rating: 4.3, status: 'closed', image: '' },
];

const categories = [
  { id: 1, name: '한식', icon: '🍚', count: 45 },
  { id: 2, name: '중식', icon: '🥟', count: 28 },
  { id: 3, name: '일식', icon: '🍣', count: 32 },
  { id: 4, name: '양식', icon: '🍝', count: 25 },
  { id: 5, name: '분식', icon: '🍜', count: 18 },
  { id: 6, name: '카페', icon: '☕', count: 42 },
  { id: 7, name: '치킨', icon: '🍗', count: 22 },
  { id: 8, name: '피자', icon: '🍕', count: 15 },
  { id: 9, name: '베이커리', icon: '🥐', count: 12 },
  { id: 10, name: '패스트푸드', icon: '🍔', count: 20 },
  { id: 11, name: '아시안', icon: '🍛', count: 16 },
  { id: 12, name: '바/주점', icon: '🍺', count: 14 },
];

const reviews = [
  { id: 1, user: '맛집탐험가', restaurant: '맛있는 갈비집', rating: 5, text: '정말 맛있어요! 갈비가 부드럽고 양념이 최고입니다.', date: '2024-01-15', status: 'approved' },
  { id: 2, user: '푸디스타', restaurant: '스시 오마카세', rating: 4, text: '신선한 생선과 좋은 서비스. 가격대비 만족합니다.', date: '2024-01-14', status: 'approved' },
  { id: 3, user: '미식가123', restaurant: '양자강', rating: 3, text: '보통이에요. 기대했던 것보다는 좀 아쉬웠습니다.', date: '2024-01-13', status: 'pending' },
  { id: 4, user: '맛집매니아', restaurant: '피자헛', rating: 4, text: '피자가 맛있고 치즈가 풍부합니다!', date: '2024-01-12', status: 'approved' },
  { id: 5, user: '음식리뷰어', restaurant: '콩나물국밥', rating: 5, text: '해장으로 최고! 깔끔하고 시원한 맛.', date: '2024-01-11', status: 'rejected' },
];

const members = [
  { id: 1, nickname: '맛집탐험가', email: 'explorer@email.com', grade: 'vip', reviews: 128, joinDate: '2023-05-12', status: 'active' },
  { id: 2, nickname: '푸디스타', email: 'foodista@email.com', grade: 'gold', reviews: 87, joinDate: '2023-07-23', status: 'active' },
  { id: 3, nickname: '미식가123', email: 'gourmet@email.com', grade: 'silver', reviews: 45, joinDate: '2023-09-15', status: 'inactive' },
  { id: 4, nickname: '맛집매니아', email: 'mania@email.com', grade: 'gold', reviews: 92, joinDate: '2023-06-08', status: 'active' },
  { id: 5, nickname: '음식리뷰어', email: 'reviewer@email.com', grade: 'bronze', reviews: 23, joinDate: '2023-11-20', status: 'banned' },
];

// ==================== 임시 이미지 저장 변수 ====================
let restaurantImages = [];

// ==================== DOM 요소 ====================
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
const imagePreviewOverlay = document.getElementById('imagePreviewOverlay');
const imagePreviewClose = document.getElementById('imagePreviewClose');
const imagePreviewImg = document.getElementById('imagePreviewImg');

// ==================== 사이드바 토글 ====================
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// ==================== 네비게이션 ====================
navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const pageName = item.dataset.page;
    
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    
    pages.forEach(page => {
      page.classList.remove('active');
      if (page.id === pageName) {
        page.classList.add('active');
      }
    });
    
    // 모바일에서 사이드바 닫기
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
    }
  });
});

// 카드 링크 클릭
document.querySelectorAll('.card-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageName = link.dataset.page;
    
    navItems.forEach(nav => {
      nav.classList.remove('active');
      if (nav.dataset.page === pageName) {
        nav.classList.add('active');
      }
    });
    
    pages.forEach(page => {
      page.classList.remove('active');
      if (page.id === pageName) {
        page.classList.add('active');
      }
    });
  });
});

// ==================== 모달 ====================
function openModal(title, content) {
  modalTitle.textContent = title;
  modalContent.innerHTML = content;
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  restaurantImages = []; // 이미지 초기화
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// ==================== 이미지 미리보기 모달 ====================
function openImagePreview(src) {
  imagePreviewImg.src = src;
  imagePreviewOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeImagePreview() {
  imagePreviewOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

imagePreviewClose.addEventListener('click', closeImagePreview);
imagePreviewOverlay.addEventListener('click', (e) => {
  if (e.target === imagePreviewOverlay) {
    closeImagePreview();
  }
});

// ==================== 별점 렌더링 ====================
function renderStars(rating) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars += '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
    } else {
      stars += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
    }
  }
  return stars;
}

// ==================== 대시보드 테이블 렌더링 ====================
function renderDashboard() {
  // 최근 맛집 테이블
  const recentRestaurantsTable = document.getElementById('recentRestaurantsTable');
  recentRestaurantsTable.innerHTML = restaurants.slice(0, 5).map(r => `
    <tr>
      <td>${r.name}</td>
      <td>${r.category}</td>
      <td>2024-01-15</td>
      <td><span class="status-badge ${r.status}">${getStatusText(r.status)}</span></td>
    </tr>
  `).join('');

  // 최근 리뷰 리스트
  const recentReviewsList = document.getElementById('recentReviewsList');
  recentReviewsList.innerHTML = reviews.slice(0, 4).map(r => `
    <div class="review-item">
      <div class="review-header">
        <span class="review-user">${r.user}</span>
        <div class="review-rating">${renderStars(r.rating)}</div>
      </div>
      <p class="review-text">${r.text}</p>
      <span class="review-meta">${r.restaurant} · ${r.date}</span>
    </div>
  `).join('');
}

// ==================== 맛집 관리 ====================
function renderRestaurantsTable() {
  const table = document.getElementById('restaurantsTable');
  table.innerHTML = restaurants.map(r => `
    <tr>
      <td>
        ${r.image ? `<img src="${r.image}" class="restaurant-thumb" onclick="openImagePreview('${r.image}')">` : `
        <div class="restaurant-thumb-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </div>`}
      </td>
      <td>${r.name}</td>
      <td>${r.category}</td>
      <td>${r.address}</td>
      <td><div class="rating">${renderStars(r.rating)} <span style="margin-left: 4px; color: var(--text-secondary);">${r.rating}</span></div></td>
      <td><span class="status-badge ${r.status}">${getStatusText(r.status)}</span></td>
      <td>
        <div style="display: flex; gap: 8px;">
          <button class="action-btn" onclick="editRestaurant(${r.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button class="action-btn" onclick="deleteRestaurant(${r.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function getStatusText(status) {
  const statusMap = {
    'active': '운영중',
    'pending': '검토중',
    'closed': '폐업',
    'approved': '승인됨',
    'rejected': '거부됨',
    'inactive': '휴면',
    'banned': '정지'
  };
  return statusMap[status] || status;
}

// 이미지 미리보기 업데이트
function updateImagePreviews() {
  const previewGrid = document.getElementById('restaurantImagePreviewGrid');
  if (!previewGrid) return;
  
  previewGrid.innerHTML = restaurantImages.map((img, index) => `
    <div class="image-preview-item">
      <img src="${img}" alt="가게 사진 ${index + 1}">
      <button class="image-preview-remove" onclick="removeRestaurantImage(${index})">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `).join('');
}

function removeRestaurantImage(index) {
  restaurantImages.splice(index, 1);
  updateImagePreviews();
}

// 맛집 추가 모달
document.getElementById('addRestaurantBtn').addEventListener('click', () => {
  restaurantImages = []; // 이미지 초기화
  
  const categoryOptions = categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  
  openModal('새 맛집 추가', `
    <form id="addRestaurantForm">
      <div class="form-group">
        <label class="form-label">가게 사진</label>
        <div class="file-upload-area" id="restaurantImageUploadArea">
          <div class="file-upload-content">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>가게 사진을 드래그하거나 클릭하여 업로드</span>
            <span class="file-upload-hint">PNG, JPG (최대 5MB, 여러 장 업로드 가능)</span>
          </div>
          <input type="file" accept="image/*" id="restaurantImageInput" hidden multiple>
        </div>
        <div class="image-preview-grid" id="restaurantImagePreviewGrid"></div>
      </div>
      <div class="form-group">
        <label class="form-label">가게명 *</label>
        <input type="text" class="form-input" id="restaurantName" required placeholder="가게명을 입력하세요">
      </div>
      <div class="form-group">
        <label class="form-label">카테고리 *</label>
        <select class="form-select" id="restaurantCategory" required>
          <option value="">카테고리 선택</option>
          ${categoryOptions}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">주소 *</label>
        <input type="text" class="form-input" id="restaurantAddress" required placeholder="주소를 입력하세요">
      </div>
      <div class="form-group">
        <label class="form-label">전화번호</label>
        <input type="tel" class="form-input" id="restaurantPhone" placeholder="02-1234-5678">
      </div>
      <div class="form-group">
        <label class="form-label">영업시간</label>
        <input type="text" class="form-input" id="restaurantHours" placeholder="09:00 - 22:00">
      </div>
      <div class="form-group">
        <label class="form-label">태그추가</label>
        <textarea class="form-textarea" id="restaurantDesc" placeholder="가게 소개를 입력하세요"></textarea>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">추가</button>
      </div>
    </form>
  `);
  
  // 이미지 업로드 이벤트 설정
  setupRestaurantImageUpload();
  
  // 폼 제출 이벤트
  document.getElementById('addRestaurantForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newRestaurant = {
      id: restaurants.length + 1,
      name: document.getElementById('restaurantName').value,
      category: document.getElementById('restaurantCategory').value,
      address: document.getElementById('restaurantAddress').value,
      rating: 0,
      status: 'pending',
      image: restaurantImages[0] || ''
    };
    restaurants.push(newRestaurant);
    renderRestaurantsTable();
    renderDashboard();
    closeModal();
    alert('맛집이 추가되었습니다.');
  });
});

function setupRestaurantImageUpload() {
  const uploadArea = document.getElementById('restaurantImageUploadArea');
  const imageInput = document.getElementById('restaurantImageInput');
  
  if (!uploadArea || !imageInput) return;
  
  // 클릭 이벤트
  uploadArea.addEventListener('click', () => {
    imageInput.click();
  });
  
  // 파일 선택 이벤트
  imageInput.addEventListener('change', (e) => {
    handleRestaurantImageFiles(e.target.files);
  });
  
  // 드래그 앤 드롭 이벤트
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });
  
  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });
  
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    handleRestaurantImageFiles(e.dataTransfer.files);
  });
}

function handleRestaurantImageFiles(files) {
  Array.from(files).forEach(file => {
    if (file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        restaurantImages.push(e.target.result);
        updateImagePreviews();
      };
      reader.readAsDataURL(file);
    }
  });
}

function editRestaurant(id) {
  const restaurant = restaurants.find(r => r.id === id);
  if (!restaurant) return;
  
  restaurantImages = restaurant.image ? [restaurant.image] : [];
  const categoryOptions = categories.map(c => 
    `<option value="${c.name}" ${c.name === restaurant.category ? 'selected' : ''}>${c.name}</option>`
  ).join('');
  
  openModal('맛집 수정', `
    <form id="editRestaurantForm">
      <div class="form-group">
        <label class="form-label">가게 사진</label>
        <div class="file-upload-area" id="restaurantImageUploadArea">
          <div class="file-upload-content">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>가게 사진을 드래그하거나 클릭하여 업로드</span>
            <span class="file-upload-hint">PNG, JPG (최대 5MB, 여러 장 업로드 가능)</span>
          </div>
          <input type="file" accept="image/*" id="restaurantImageInput" hidden multiple>
        </div>
        <div class="image-preview-grid" id="restaurantImagePreviewGrid"></div>
      </div>
      <div class="form-group">
        <label class="form-label">가게명 *</label>
        <input type="text" class="form-input" id="restaurantName" value="${restaurant.name}" required>
      </div>
      <div class="form-group">
        <label class="form-label">카테고리 *</label>
        <select class="form-select" id="restaurantCategory" required>
          ${categoryOptions}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">주소 *</label>
        <input type="text" class="form-input" id="restaurantAddress" value="${restaurant.address}" required>
      </div>
      <div class="form-group">
        <label class="form-label">상태</label>
        <select class="form-select" id="restaurantStatus">
          <option value="active" ${restaurant.status === 'active' ? 'selected' : ''}>운영중</option>
          <option value="pending" ${restaurant.status === 'pending' ? 'selected' : ''}>검토중</option>
          <option value="closed" ${restaurant.status === 'closed' ? 'selected' : ''}>폐업</option>
        </select>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">저장</button>
      </div>
    </form>
  `);
  
  // 이미지 업로드 이벤트 설정
  setupRestaurantImageUpload();
  updateImagePreviews();
  
  // 폼 제출 이벤트
  document.getElementById('editRestaurantForm').addEventListener('submit', (e) => {
    e.preventDefault();
    restaurant.name = document.getElementById('restaurantName').value;
    restaurant.category = document.getElementById('restaurantCategory').value;
    restaurant.address = document.getElementById('restaurantAddress').value;
    restaurant.status = document.getElementById('restaurantStatus').value;
    restaurant.image = restaurantImages[0] || '';
    renderRestaurantsTable();
    renderDashboard();
    closeModal();
    alert('맛집 정보가 수정되었습니다.');
  });
}

function deleteRestaurant(id) {
  if (confirm('정말 삭제하시겠습니까?')) {
    const index = restaurants.findIndex(r => r.id === id);
    if (index > -1) {
      restaurants.splice(index, 1);
      renderRestaurantsTable();
      renderDashboard();
      alert('삭제되었습니다.');
    }
  }
}

// ==================== 카테고리 관리 ====================
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  grid.innerHTML = categories.map(c => `
    <div class="category-card">
      <div class="category-info">
        <div class="category-icon">${c.icon}</div>
        <div class="category-details">
          <span class="category-name">${c.name}</span>
          <span class="category-count">${c.count}개 맛집</span>
        </div>
      </div>
      <div class="category-actions">
        <button class="action-btn" onclick="editCategory(${c.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button class="action-btn" onclick="deleteCategory(${c.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
  
  // 카테고리 필터 옵션 업데이트
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="">전체 카테고리</option>' + 
    categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
}

document.getElementById('addCategoryBtn').addEventListener('click', () => {
  openModal('새 카테고리 추가', `
    <form id="addCategoryForm">
      <div class="form-group">
        <label class="form-label">카테고리명 *</label>
        <input type="text" class="form-input" id="categoryName" required placeholder="카테고리명을 입력하세요">
      </div>
      <div class="form-group">
        <label class="form-label">아이콘 (이모지)</label>
        <input type="text" class="form-input" id="categoryIcon" placeholder="🍽️">
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">추가</button>
      </div>
    </form>
  `);
  
  document.getElementById('addCategoryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const newCategory = {
      id: categories.length + 1,
      name: document.getElementById('categoryName').value,
      icon: document.getElementById('categoryIcon').value || '🍽️',
      count: 0
    };
    categories.push(newCategory);
    renderCategories();
    closeModal();
    alert('카테고리가 추가되었습니다.');
  });
});

function editCategory(id) {
  const category = categories.find(c => c.id === id);
  if (!category) return;
  
  openModal('카테고리 수정', `
    <form id="editCategoryForm">
      <div class="form-group">
        <label class="form-label">카테고리명 *</label>
        <input type="text" class="form-input" id="categoryName" value="${category.name}" required>
      </div>
      <div class="form-group">
        <label class="form-label">아이콘 (이모지)</label>
        <input type="text" class="form-input" id="categoryIcon" value="${category.icon}">
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">저장</button>
      </div>
    </form>
  `);
  
  document.getElementById('editCategoryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    category.name = document.getElementById('categoryName').value;
    category.icon = document.getElementById('categoryIcon').value;
    renderCategories();
    closeModal();
    alert('카테고리가 수정되었습니다.');
  });
}

function deleteCategory(id) {
  if (confirm('정말 삭제하시겠습니까?')) {
    const index = categories.findIndex(c => c.id === id);
    if (index > -1) {
      categories.splice(index, 1);
      renderCategories();
      alert('삭제되었습니다.');
    }
  }
}

// ==================== 리뷰 관리 ====================
function renderReviews() {
  const list = document.getElementById('reviewManageList');
  list.innerHTML = reviews.map(r => `
    <div class="review-manage-item">
      <div class="review-manage-header">
        <div class="review-manage-info">
          <span class="review-manage-user">${r.user}</span>
          <span class="review-manage-restaurant">${r.restaurant}</span>
        </div>
        <div class="review-rating">${renderStars(r.rating)}</div>
      </div>
      <p class="review-manage-content">${r.text}</p>
      <div class="review-manage-footer">
        <span class="review-manage-date">${r.date}</span>
        <div class="review-manage-actions">
          ${r.status === 'pending' ? `
            <button class="btn btn-sm btn-success" onclick="approveReview(${r.id})">승인</button>
            <button class="btn btn-sm btn-danger" onclick="rejectReview(${r.id})">거부</button>
          ` : `
            <span class="status-badge ${r.status}">${getStatusText(r.status)}</span>
          `}
          <button class="btn btn-sm btn-secondary" onclick="deleteReview(${r.id})">삭제</button>
        </div>
      </div>
    </div>
  `).join('');
}

function approveReview(id) {
  const review = reviews.find(r => r.id === id);
  if (review) {
    review.status = 'approved';
    renderReviews();
    alert('리뷰가 승인되었습니다.');
  }
}

function rejectReview(id) {
  const review = reviews.find(r => r.id === id);
  if (review) {
    review.status = 'rejected';
    renderReviews();
    alert('리뷰가 거부되었습니다.');
  }
}

function deleteReview(id) {
  if (confirm('정말 삭제하시겠습니까?')) {
    const index = reviews.findIndex(r => r.id === id);
    if (index > -1) {
      reviews.splice(index, 1);
      renderReviews();
      renderDashboard();
      alert('삭제되었습니다.');
    }
  }
}

// ==================== 회원 관리 ====================
function renderMembers() {
  const table = document.getElementById('membersTable');
  table.innerHTML = members.map(m => `
    <tr>
      <td>
        <div class="profile-placeholder">${m.nickname.charAt(0)}</div>
      </td>
      <td>${m.nickname}</td>
      <td>${m.email}</td>
      <td><span class="grade-badge ${m.grade}">${m.grade.toUpperCase()}</span></td>
      <td>${m.reviews}</td>
      <td>${m.joinDate}</td>
      <td><span class="status-badge ${m.status}">${getStatusText(m.status)}</span></td>
      <td>
        <div style="display: flex; gap: 8px;">
          <button class="action-btn" onclick="viewMember(${m.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          <button class="action-btn" onclick="toggleMemberStatus(${m.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function viewMember(id) {
  const member = members.find(m => m.id === id);
  if (!member) return;
  
  openModal('회원 정보', `
    <div style="text-align: center; margin-bottom: 24px;">
      <div class="profile-placeholder" style="width: 80px; height: 80px; font-size: 32px; margin: 0 auto 16px;">
        ${member.nickname.charAt(0)}
      </div>
      <h3 style="font-size: 18px; margin-bottom: 4px;">${member.nickname}</h3>
      <span class="grade-badge ${member.grade}">${member.grade.toUpperCase()}</span>
    </div>
    <div style="display: grid; gap: 12px;">
      <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--bg-tertiary); border-radius: var(--radius-md);">
        <span style="color: var(--text-muted);">이메일</span>
        <span>${member.email}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--bg-tertiary); border-radius: var(--radius-md);">
        <span style="color: var(--text-muted);">작성 리뷰</span>
        <span>${member.reviews}개</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--bg-tertiary); border-radius: var(--radius-md);">
        <span style="color: var(--text-muted);">가입일</span>
        <span>${member.joinDate}</span>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 12px; background: var(--bg-tertiary); border-radius: var(--radius-md);">
        <span style="color: var(--text-muted);">상태</span>
        <span class="status-badge ${member.status}">${getStatusText(member.status)}</span>
      </div>
    </div>
    <div class="modal-actions">
      <button type="button" class="btn btn-secondary" onclick="closeModal()">닫기</button>
    </div>
  `);
}

function toggleMemberStatus(id) {
  const member = members.find(m => m.id === id);
  if (!member) return;
  
  const newStatus = member.status === 'banned' ? 'active' : 'banned';
  const action = newStatus === 'banned' ? '정지' : '정지 해제';
  
  if (confirm(`해당 회원을 ${action}하시겠습니까?`)) {
    member.status = newStatus;
    renderMembers();
    alert(`회원이 ${action}되었습니다.`);
  }
}

// ==================== 설정 탭 ====================
const settingsTabs = document.querySelectorAll('.settings-tab');
const settingsPanels = document.querySelectorAll('.settings-panel');

settingsTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabName = tab.dataset.settingsTab;
    
    settingsTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    settingsPanels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === `settings-${tabName}`) {
        panel.classList.add('active');
      }
    });
  });
});

// ==================== 파일 업로드 영역 설정 ====================
function setupFileUpload(areaId, inputId) {
  const uploadArea = document.getElementById(areaId);
  const fileInput = document.getElementById(inputId);
  
  if (!uploadArea || !fileInput) return;
  
  uploadArea.addEventListener('click', () => {
    fileInput.click();
  });
  
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });
  
  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });
  
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    // 파일 처리 로직
  });
}

// ==================== 초기화 ====================
function init() {
  renderDashboard();
  renderRestaurantsTable();
  renderCategories();
  renderReviews();
  renderMembers();
  
  // 파일 업로드 영역 설정
  setupFileUpload('logoUploadArea', 'logoInput');
  setupFileUpload('ogImageUploadArea', 'ogImageInput');
  setupFileUpload('backupUploadArea', 'backupInput');
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', init);

// ==================== 설정 저장 함수 (더미) ====================
function saveGeneralSettings() {
  alert('일반 설정이 저장되었습니다.');
}

function saveContactSettings() {
  alert('연락처 정보가 저장되었습니다.');
}

function changePassword() {
  const current = document.getElementById('currentPassword').value;
  const newPass = document.getElementById('newPassword').value;
  const confirm = document.getElementById('confirmPassword').value;
  
  if (!current || !newPass || !confirm) {
    alert('모든 필드를 입력해주세요.');
    return;
  }
  
  if (newPass !== confirm) {
    alert('새 비밀번호가 일치하지 않습니다.');
    return;
  }
  
  alert('비밀번호가 변경되었습니다.');
  document.getElementById('currentPassword').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmPassword').value = '';
}

function createBackup() {
  alert('백업 파일이 생성되었습니다.');
}
