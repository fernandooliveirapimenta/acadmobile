angular.module('app')
.constant('AUTH_EVENTS',{
	notAuthenticated: 'auth-not-authenticated',
	notAuthroized: 'auth-not-authorized'
})
.constant('USER_ROLES',{
   admin: 'admin-roles',
   public: 'public'
});