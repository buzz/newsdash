import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import logoNewsdashUrl from 'newsdash/static/logo-newsdash.svg'
import css from './About.sss'

import pkgInfo from '../../../../../package.json'

const About = () => (
  <div className={css.about}>
    <img src={logoNewsdashUrl} alt="newsdash" />
    <h2>A news dashboard inspired by iGoogle and Netvibes</h2>
    <p className={css.big}>
      <a
        href="https://github.com/buzz/newsdash#readme"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon className={css.icon} icon={faGithub} />
        github.com/buzz/newsdash
      </a>
    </p>
    <p className={css.big}>Version {pkgInfo.version}</p>
    <p>
      Licensed under the
      <br />
      <a
        href="https://www.gnu.org/licenses/agpl-3.0.en.html"
        rel="noopener noreferrer"
        target="_blank"
      >
        GNU Affero General Public License v3.0
      </a>
    </p>
  </div>
)

export default About
