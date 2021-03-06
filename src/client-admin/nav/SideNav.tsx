import { pipe } from 'ramda'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { signOut } from 'client-common/store/actions/auth'
import { closeSideNav } from 'client-common/store/reducers/sideNav'
import { SideNavLink } from 'client-common/component/general/SideNavLink'
import { CloseButton } from '../../client-common/component/general/CloseButton'

interface SideNavStateProps {
  session: state.Session
  sideNavActive: state.SideNav['active']
}

interface SideNavDispatchProps {
  signOut: typeof signOut
  closeSideNav: typeof closeSideNav
}

const mapStateToProps = (state: state.Root) => ({
  session: state.app.session,
  sideNavActive: state.app.sideNav.active
})

export const SideNav = pipe(
  withRouter,
  connect<SideNavStateProps, SideNavDispatchProps, {}>(
    mapStateToProps,
    { signOut, closeSideNav }
  )
)(function SideNavComp(
  props: SideNavStateProps & SideNavDispatchProps & RouteComponentProps<{}>
) {
  if (!props.session.signedIn || !props.sideNavActive) {
    return <div />
  }

  return (
    <div className="sidebar">
      <div className="sidebar-content clearfix flex-column d-flex">
        <div className="m-2 d-flex justify-content-between">
          <h4 className="my-0">
            <SideNavLink exact to="/">
              <span className="text-danger">Zsebtanár</span>
            </SideNavLink>
          </h4>
          <CloseButton onClick={props.closeSideNav} aria-label="Menü bezárása"/>
        </div>
        <nav className="mobile-nav">
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <SideNavLink activeClassName="active" className="nav-link" to="/user">
                Felhasználók
              </SideNavLink>
            </li>

            <li className="nav-item">
              <SideNavLink activeClassName="active" className="nav-link" to="/feedback">
                Visszajelzés
              </SideNavLink>
            </li>

            <li className="nav-item">
              <SideNavLink activeClassName="active" className="nav-link" to="/classification">
                Kategóriák
              </SideNavLink>
            </li>

            <li className="nav-item">
              <SideNavLink activeClassName="active" className="nav-link" to="/exercise">
                Feladatok
              </SideNavLink>
            </li>
            <li>
              <hr />
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Publikus
              </a>
            </li>
            <li className="nav-item" key="sing-out">
              <a href="" className="nav-link" onClick={props.signOut} title="Kijelentkezés">
                Kijelentkezés
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
})
