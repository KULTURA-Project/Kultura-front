import React from 'react';
import PropTypes from 'prop-types';
import './Category.css';
import { FaCircle } from 'react-icons/fa';

/**
 * Category component
 *
 * Props:
 * - label: string (texte à afficher)
 * - form: 'normal' | 'full' (par défaut: 'normal')
 * - icon: React node (optionnel, utilisé seulement en full)
 */
export default function Category({ label, form = 'normal', icon }) {
  const isFull = form === 'full';

  return (
    <div className={`category category--${isFull ? 'full' : 'normal'}`}>
      {isFull && (
        <div className="category-icon">
          {icon || <FaCircle size={40} />}
        </div>
      )}
      <span className="category-label">{label}</span>
    </div>
  );
}

Category.propTypes = {
  label: PropTypes.string.isRequired,
  form: PropTypes.oneOf(['normal', 'full']),
  icon: PropTypes.node,
};
