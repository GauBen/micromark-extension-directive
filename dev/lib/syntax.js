/**
 * @import {Extension} from 'micromark-util-types'
 * @import {Options} from '../index.js'
 */

import {codes} from 'micromark-util-symbol'
import {directiveContainer} from './directive-container.js'
import {directiveLeaf} from './directive-leaf.js'
import {directiveText} from './directive-text.js'

/**
 * Create an extension for `micromark` to enable directive syntax.
 *
 * @param {Options} [options] Change the behavior of the directive extension.
 *
 * @returns {Extension}
 *   Extension for `micromark` that can be passed in `extensions`, to
 *   enable directive syntax.
 */
export function directive(options = {}) {
  /** @type {Extension} */
  const extension = {}

  if (!options.disableTextDirective)
    extension.text = {[codes.colon]: directiveText}

  const flow = []
  if (!options.disableContainerDirective) flow.push(directiveContainer)
  if (!options.disableLeafDirective) flow.push(directiveLeaf)
  if (flow.length > 0) extension.flow = {[codes.colon]: flow}

  return extension
}
