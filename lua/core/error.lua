-- Logotypes SDK error

local LogotypesError = {}
LogotypesError.__index = LogotypesError


function LogotypesError.new(code, msg, ctx)
  local self = setmetatable({}, LogotypesError)
  self.is_sdk_error = true
  self.sdk = "Logotypes"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function LogotypesError:error()
  return self.msg
end


function LogotypesError:__tostring()
  return self.msg
end


return LogotypesError
