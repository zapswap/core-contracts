// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/IZapswapPoolImmutables.sol';
import './pool/IZapswapPoolState.sol';
import './pool/IZapswapPoolDerivedState.sol';
import './pool/IZapswapPoolActions.sol';
import './pool/IZapswapPoolOwnerActions.sol';
import './pool/IZapswapPoolEvents.sol';

/// @title The interface for a Zapswap Pool
/// @notice A Zapswap pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface IZapswapPool is
IZapswapPoolImmutables,
IZapswapPoolState,
IZapswapPoolDerivedState,
IZapswapPoolActions,
IZapswapPoolOwnerActions,
IZapswapPoolEvents
{

}
