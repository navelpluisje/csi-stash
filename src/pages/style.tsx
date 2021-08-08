import { Page } from '@components/page'
import Head from 'next/head'
import React from 'react'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <Page>
      <Head>
        <title>CSI-Stash :: Style</title>
      </Head>

      <h4>headings</h4>
      <h1>Headings, Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <hr />
      <h4>Paragraph</h4>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae voluptatum, sed tenetur eaque repudiandae ducimus recusandae saepe consectetur molestias, nam ipsum blanditiis quos unde. Soluta eveniet tempore minima odit hic?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae voluptatum, sed tenetur eaque repudiandae ducimus recusandae saepe consectetur molestias, nam ipsum blanditiis quos unde. Soluta eveniet tempore minima odit hic?</p>
      <hr />
      <h4>BlockQuote</h4>
      <blockquote>This is a blockquote</blockquote>
      <hr />
      <h4>Buttons</h4>
      <a className="button" href="#">Default Button</a>
      <button className="button button-outline">Outlined Button</button>
      <input className="button button-clear" type="submit" value="Clear Button"></input>
      <hr />
      <h4>Table</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Height</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Stephen Curry</td>
            <td>27</td>
            <td>1,91</td>
            <td>Akron, OH</td>
          </tr>
          <tr>
            <td>Klay Thompson</td>
            <td>25</td>
            <td>2,01</td>
            <td>Los Angeles, CA</td>
          </tr>
        </tbody>
      </table>
    </Page>
  )
}
