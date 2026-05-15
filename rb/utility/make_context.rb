# Logotypes SDK utility: make_context
require_relative '../core/context'
module LogotypesUtilities
  MakeContext = ->(ctxmap, basectx) {
    LogotypesContext.new(ctxmap, basectx)
  }
end
