const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

const requireAdminView = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    const loginUrl = process.env.CLIENT_ORIGIN ? `${process.env.CLIENT_ORIGIN}/login` : '/login';
    return res.status(401).send(
      `<!DOCTYPE html><html><body style="font-family:sans-serif;padding:3rem;text-align:center;">
       <h2>401 Unauthorized</h2>
       <p>Please log in with an Administrator account to view the executive report.</p>
       <a href="${loginUrl}" style="display:inline-block;margin-top:1rem;padding:0.75rem 1.5rem;background:#2E7D32;color:white;text-decoration:none;border-radius:8px;">Go to FarmFlow Login</a>
       </body></html>`
    );
  }
  if (req.session.role !== 'admin') {
    return res.status(403).send(
      `<!DOCTYPE html><html><body style="font-family:sans-serif;padding:3rem;text-align:center;">
       <h2>403 Forbidden</h2>
       <p>Your current account role (${req.session.role}) does not have access to administrator reports.</p>
       </body></html>`
    );
  }
  next();
};

router.get('/admin-report', requireAdminView, viewController.getAdminReport);
router.get('/certificate/:batchId', viewController.getCertificate);
router.get('/complaint/:batchId', viewController.getComplaintForm);
router.post('/complaint/:batchId', viewController.postComplaint);

module.exports = router;
