// ==================== 데이터 ==================== //
let restaurants = [
  { id: 1, name: '을지로 골목식당', category: '한식', address: '서울 중구 을지로3가', rating: 4.8, status: 'active', date: '2024-01-15' },
  { id: 2, name: '홍대 파스타하우스', category: '양식', address: '서울 마포구 홍대입구', rating: 4.5, status: 'active', date: '2024-01-14' },
  { id: 3, name: '신사동 스시오마카세', category: '일식', address: '서울 강남구 신사동', rating: 4.9, status: 'active', date: '2024-01-13' },
  { id: 4, name: '이태원 타코집', category: '멕시칸', address: '서울 용산구 이태원동', rating: 4.3, status: 'pending', date: '2024-01-12' },
  { id: 5, name: '명동 칼국수', category: '한식', address: '서울 중구 명동', rating: 4.6, status: 'active', date: '2024-01-11' },
  { id: 6, name: '강남역 삼겹살', category: '한식', address: '서울 강남구 역삼동', rating: 4.4, status: 'closed', date: '2024-01-10' },
];

let categories = [
  { id: 1, name: '한식', icon: '🍚', count: 45 },
  { id: 2, name: '양식', icon: '🍝', count: 28 },
  { id: 3, name: '일식', icon: '🍣', count: 22 },
  { id: 4, name: '중식', icon: '🥡', count: 18 },
  { id: 5, name: '멕시칸', icon: '🌮', count: 8 },
  { id: 6, name: '카페', icon: '☕', count: 35 },
  { id: 7, name: '분식', icon: '🍜', count: 15 },
  { id: 8, name: '치킨', icon: '🍗', count: 20 },
];

let reviews = [
  { id: 1, user: '맛집헌터', restaurant: '을지로 골목식당', rating: 5, text: '정말 맛있어요! 분위기도 좋고 가격도 합리적입니다. 다음에 또 방문할게요.', date: '2024-01-15', status: 'approved' },
  { id: 2, user: '푸드러버', restaurant: '홍대 파스타하우스', rating: 4, text: '파스타가 알덴테로 잘 나왔어요. 소스도 진하고 맛있습니다.', date: '2024-01-14', status: 'pending' },
  { id: 3, user: '미식가', restaurant: '신사동 스시오마카세', rating: 5, text: '최고의 오마카세였습니다. 신선한 재료와 셰프의 손맛이 느껴져요.', date: '2024-01-13', status: 'approved' },
  { id: 4, user: '여행객', restaurant: '이태원 타코집', rating: 3, text: '타코는 괜찮았는데 서비스가 조금 아쉬웠어요.', date: '2024-01-12', status: 'pending' },
  { id: 5, user: '직장인A', restaurant: '명동 칼국수', rating: 5, text: '점심특선이 정말 가성비 좋아요. 자주 올 것 같습니다.', date: '2024-01-11', status: 'approved' },
];

// ==================== DOM 요소 ==================== //
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.getElementById('menuToggle');
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const cardLinks = document.querySelectorAll('.card-link');
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

// ==================== 초기화 ==================== //
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileMenu();
  initModal();
  renderDashboard();
  renderRestaurants();
  renderCategories();
  renderReviews();
  initFilters();
  initButtons();
});

// ==================== 네비게이션 ==================== //
function initNavigation() {
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      navigateTo(page);
    });
  });
  
  cardLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      navigateTo(page);
    });
  });
}

function navigateTo(pageId) {
  // 네비게이션 아이템 활성화
  navItems.forEach(item => {
    item.classList.toggle('active', item.dataset.page === pageId);
  });
  
  // 페이지 표시
  pages.forEach(page => {
    page.classList.toggle('active', page.id === pageId);
  });
  
  // 모바일에서 사이드바 닫기
  if (window.innerWidth <= 768) {
    sidebar.classList.remove('open');
  }
}

// ==================== 모바일 메뉴 ==================== //
function initMobileMenu() {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
  
  // 외부 클릭시 닫기
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

// ==================== 모달 ==================== //
function initModal() {
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function openModal(title, content) {
  modalTitle.textContent = title;
  modalContent.innerHTML = content;
  modalOverlay.classList.add('active');
}

function closeModal() {
  modalOverlay.classList.remove('active');
}

// ==================== 대시보드 렌더링 ==================== //
function renderDashboard() {
  // 최근 맛집
  const recentTable = document.getElementById('recentRestaurantsTable');
  const recentRestaurants = restaurants.slice(0, 5);
  
  recentTable.innerHTML = recentRestaurants.map(r => `
    <tr>
      <td>${r.name}</td>
      <td>${r.category}</td>
      <td>${r.date}</td>
      <td><span class="status-badge ${r.status}">${getStatusText(r.status)}</span></td>
    </tr>
  `).join('');
  
  // 최근 리뷰
  const reviewList = document.getElementById('recentReviewsList');
  const recentReviews = reviews.slice(0, 4);
  
  reviewList.innerHTML = recentReviews.map(r => `
    <div class="review-item">
      <div class="review-header">
        <span class="review-user">${r.user}</span>
        <div class="review-rating">
          ${renderStars(r.rating)}
        </div>
      </div>
      <p class="review-text">${r.text}</p>
      <span class="review-meta">${r.restaurant} · ${r.date}</span>
    </div>
  `).join('');
}

// ==================== 맛집 렌더링 ==================== //
function renderRestaurants(filteredData = null) {
  const table = document.getElementById('restaurantsTable');
  const data = filteredData || restaurants;
  
  table.innerHTML = data.map(r => `
    <tr>
      <td>${r.name}</td>
      <td>${r.category}</td>
      <td>${r.address}</td>
      <td>
        <div class="rating">
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          ${r.rating}
        </div>
      </td>
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

// ==================== 카테고리 렌더링 ==================== //
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
  
  // 카테고리 필터 옵션도 업데이트
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="">전체 카테고리</option>' + 
    categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
}

// ==================== 리뷰 렌더링 ==================== //
function renderReviews(filteredData = null) {
  const list = document.getElementById('reviewManageList');
  const data = filteredData || reviews;
  
  list.innerHTML = data.map(r => `
    <div class="review-manage-item">
      <div class="review-manage-header">
        <div class="review-manage-info">
          <span class="review-manage-user">${r.user}</span>
          <span class="review-manage-restaurant">${r.restaurant}</span>
        </div>
        <div class="review-rating">
          ${renderStars(r.rating)}
        </div>
      </div>
      <p class="review-manage-content">${r.text}</p>
      <div class="review-manage-footer">
        <span class="review-manage-date">${r.date}</span>
        <div class="review-manage-actions">
          ${r.status === 'pending' ? `
            <button class="btn btn-sm btn-success" onclick="approveReview(${r.id})">승인</button>
            <button class="btn btn-sm btn-danger" onclick="rejectReview(${r.id})">거부</button>
          ` : `
            <span class="status-badge ${r.status === 'approved' ? 'active' : 'closed'}">
              ${r.status === 'approved' ? '승인됨' : '거부됨'}
            </span>
          `}
        </div>
      </div>
    </div>
  `).join('');
}

// ==================== 필터 ==================== //
function initFilters() {
  const categoryFilter = document.getElementById('categoryFilter');
  const statusFilter = document.getElementById('statusFilter');
  const reviewFilter = document.getElementById('reviewFilter');
  
  categoryFilter.addEventListener('change', filterRestaurants);
  statusFilter.addEventListener('change', filterRestaurants);
  reviewFilter.addEventListener('change', filterReviews);
}

function filterRestaurants() {
  const category = document.getElementById('categoryFilter').value;
  const status = document.getElementById('statusFilter').value;
  
  let filtered = [...restaurants];
  
  if (category) {
    filtered = filtered.filter(r => r.category === category);
  }
  
  if (status) {
    filtered = filtered.filter(r => r.status === status);
  }
  
  renderRestaurants(filtered);
}

function filterReviews() {
  const status = document.getElementById('reviewFilter').value;
  
  let filtered = [...reviews];
  
  if (status) {
    filtered = filtered.filter(r => r.status === status);
  }
  
  renderReviews(filtered);
}

// ==================== 버튼 이벤트 ==================== //
function initButtons() {
  // 맛집 추가 버튼
  document.getElementById('addRestaurantBtn').addEventListener('click', () => {
    openModal('새 맛집 추가', getRestaurantForm());
  });
  
  // 카테고리 추가 버튼
  document.getElementById('addCategoryBtn').addEventListener('click', () => {
    openModal('새 카테고리 추가', getCategoryForm());
  });
}

// ==================== CRUD 함수 ==================== //
function editRestaurant(id) {
  const restaurant = restaurants.find(r => r.id === id);
  if (restaurant) {
    openModal('맛집 수정', getRestaurantForm(restaurant));
  }
}

function deleteRestaurant(id) {
  if (confirm('정말 이 맛집을 삭제하시겠습니까?')) {
    restaurants = restaurants.filter(r => r.id !== id);
    renderRestaurants();
    renderDashboard();
  }
}

function editCategory(id) {
  const category = categories.find(c => c.id === id);
  if (category) {
    openModal('카테고리 수정', getCategoryForm(category));
  }
}

function deleteCategory(id) {
  if (confirm('정말 이 카테고리를 삭제하시겠습니까?')) {
    categories = categories.filter(c => c.id !== id);
    renderCategories();
  }
}

function approveReview(id) {
  const review = reviews.find(r => r.id === id);
  if (review) {
    review.status = 'approved';
    renderReviews();
    renderDashboard();
  }
}

function rejectReview(id) {
  const review = reviews.find(r => r.id === id);
  if (review) {
    review.status = 'rejected';
    renderReviews();
  }
}

// ==================== 폼 템플릿 ==================== //
function getRestaurantForm(data = null) {
  const isEdit = data !== null;
  return `
    <form id="restaurantForm" onsubmit="submitRestaurant(event, ${isEdit ? data.id : 'null'})">
      <div class="form-group">
        <label class="form-label">가게명</label>
        <input type="text" class="form-input" name="name" value="${data?.name || ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">카테고리</label>
        <select class="form-select" name="category" required>
          ${categories.map(c => `
            <option value="${c.name}" ${data?.category === c.name ? 'selected' : ''}>${c.name}</option>
          `).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">주소</label>
        <input type="text" class="form-input" name="address" value="${data?.address || ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">상태</label>
        <select class="form-select" name="status" required>
          <option value="active" ${data?.status === 'active' ? 'selected' : ''}>운영중</option>
          <option value="pending" ${data?.status === 'pending' ? 'selected' : ''}>검토중</option>
          <option value="closed" ${data?.status === 'closed' ? 'selected' : ''}>폐업</option>
        </select>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">${isEdit ? '수정' : '추가'}</button>
      </div>
    </form>
  `;
}

function getCategoryForm(data = null) {
  const isEdit = data !== null;
  return `
    <form id="categoryForm" onsubmit="submitCategory(event, ${isEdit ? data.id : 'null'})">
      <div class="form-group">
        <label class="form-label">카테고리명</label>
        <input type="text" class="form-input" name="name" value="${data?.name || ''}" required>
      </div>
      <div class="form-group">
        <label class="form-label">아이콘 (이모지)</label>
        <input type="text" class="form-input" name="icon" value="${data?.icon || ''}" placeholder="예: 🍚" required>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">취소</button>
        <button type="submit" class="btn btn-primary">${isEdit ? '수정' : '추가'}</button>
      </div>
    </form>
  `;
}

// ==================== 폼 제출 ==================== //
function submitRestaurant(e, id) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  
  const restaurantData = {
    name: formData.get('name'),
    category: formData.get('category'),
    address: formData.get('address'),
    status: formData.get('status'),
    rating: id ? restaurants.find(r => r.id === id)?.rating || 0 : 0,
    date: new Date().toISOString().split('T')[0]
  };
  
  if (id) {
    // 수정
    const index = restaurants.findIndex(r => r.id === id);
    if (index !== -1) {
      restaurants[index] = { ...restaurants[index], ...restaurantData };
    }
  } else {
    // 추가
    restaurantData.id = Math.max(...restaurants.map(r => r.id)) + 1;
    restaurants.unshift(restaurantData);
  }
  
  closeModal();
  renderRestaurants();
  renderDashboard();
}

function submitCategory(e, id) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  
  const categoryData = {
    name: formData.get('name'),
    icon: formData.get('icon'),
    count: id ? categories.find(c => c.id === id)?.count || 0 : 0
  };
  
  if (id) {
    // 수정
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...categoryData };
    }
  } else {
    // 추가
    categoryData.id = Math.max(...categories.map(c => c.id)) + 1;
    categories.push(categoryData);
  }
  
  closeModal();
  renderCategories();
}

// ==================== 유틸리티 함수 ==================== //
function getStatusText(status) {
  const statusMap = {
    active: '운영중',
    pending: '검토중',
    closed: '폐업'
  };
  return statusMap[status] || status;
}

function renderStars(rating) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars += '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
    }
  }
  return stars;
}
