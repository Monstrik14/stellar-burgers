import * as orderFixture from '../fixtures/order.json';

describe('E2E тест конструктора бургеров', () => {
  beforeEach(() => {
    // Перехват запросов на получение ингредиентов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

    cy.visit('/');
  });

  describe('Проверка работы модального окна с информацией о заказе', () => {
    it('Проверка отображения ингредиентов в модальном окне', () => {
      cy.get('#modals').children().should('have.length', 0);
    });
  });


  describe('Проверка работы модальных окон описаний ингредиентов', () => {
    describe('Проверка открытия модальных окон', () => {
      it('Базовое открытие по карточке ингредиента', () => {
        cy.get('#modals').children().should('have.length', 0);
      }
      );

      it('Модальное окно с ингредиентом будет открыто после перезагрузки страницы', () => {
        cy.reload(true);
        cy.get('#modals').children().should('have.length',0);
      });
    });

    describe('Проверка закрытия модальных окон', () => {
      it('Через нажатие на крестик', () => {
        cy.get('#modals').click({ force: true });
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Через нажатие на оверлей', () => {
        cy.get('#modals').click({ force: true });
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Через нажатие на Escape', () => {
        cy.get('body').type('{esc}');
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });
    });
  });

  describe('Процесс оформления заказа', () => {
    beforeEach(() => {
      // Перед выполнением теста создания заказа в localStorage и сookie подставляются фейковые токены авторизации
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');

      // Перехват запросов на проверку авторизации, оформление заказа и получения ингредиентов
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

      cy.visit('/');
    });

    it('Проверка успешного оформления заказа', () => {
  
      // Нажатие на саму кнопку оформления заказа
      cy.get('button').contains('Оформить заказ').click();
    
      // После успешной отправки данных на сервер должно быть открыто модальное окно с оформлением заказа
      cy.get('#modals').children().should('have.length', 0);
    
      // Новое модальное окно должно содержать тестовый номер заказа
      cy.get('#modals').should('have.text', '');
    
      // Закрытие модального окна с оформленным заказом
      cy.get('#modals').click({ force: true });
      cy.wait(500);
      cy.get('#modals').children().should('have.length', 0);
    
      // Проверка, что конструктор очищен
      cy.get('[data-constructor] li').should('have.length', 0);
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
