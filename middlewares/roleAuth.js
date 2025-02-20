// roles.js
const ROLES = {
    ADMIN: 'admin',
    INVESTOR: 'investor',
    BACKOFFICE: 'backoffice'
  };
  
  const PUBLIC_ROUTES = [
    '/api/v1/priceOracle/current'
  ];
  
  const INVESTOR_ROUTES = [
    // INVESTORS_ROUTES ADDED //
    '/kyc-documents',
    '/list',
    '/upload-picture'
  ];
  
  const BACKOFFICE_ROUTES = [
    '/api/v1/users',
    '/api/v1/reports',
    '/api/v1/accounts'
  ];
  
  const ADMIN_ONLY_ROUTES = [
    '/history',
    '/update',

    // New ADMIN_ONLY_ROUTES ADDED //

    '/all-investors',
    '/register',
    '/investors-records',
    '/:id',
    ':id/delete',
    '/:id/update',
    '/verify-investors',
    '/list',
    '/investments',
    '/earnings/create'
  ];
  
  // middleware/roleAuth.js
  const { errorResponse } = require('../utils/response');
  
  const authorizeRole = (req, res, next) => {
    // Skip role check for public routes
    if (PUBLIC_ROUTES.includes(req.path)) {
      return next();
    }

    const userRole = req.currentUser?.role;

    if (!userRole) {
      return errorResponse(res, 'Role not found in user data');
    }
  
    // Admin has access to everything
    if (userRole === ROLES.ADMIN) {
      return next();
    }
  
    // Check for admin-only routes
    if (ADMIN_ONLY_ROUTES.includes(req.path)) {
      return errorResponse(res, 'Access denied: Admin only route');
    }
  
    // Handle investor access
    if (userRole === ROLES.INVESTOR) {
      if (INVESTOR_ROUTES.includes(req.path)) {
        return next();
      }
      return errorResponse(res, 'Access denied: Investor restricted route');
    }
  
    // Handle backoffice access
    if (userRole === ROLES.BACKOFFICE) {
      if (BACKOFFICE_ROUTES.includes(req.path)) {
        return next();
      }
      return errorResponse(res, 'Access denied: Backoffice restricted route');
    }
  
    return errorResponse(res, 'Access denied: Invalid role');
  };
  module.exports = {
    authorizeRole,
    ROLES,
    PUBLIC_ROUTES,
    INVESTOR_ROUTES,
    BACKOFFICE_ROUTES,
    ADMIN_ONLY_ROUTES
  };  