# Logotypes SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module LogotypesFeatures
  def self.make_feature(name)
    case name
    when "base"
      LogotypesBaseFeature.new
    when "ratelimit"
      LogotypesRatelimitFeature.new
    when "retry"
      LogotypesRetryFeature.new
    when "test"
      LogotypesTestFeature.new
    when "timeout"
      LogotypesTimeoutFeature.new
    else
      LogotypesBaseFeature.new
    end
  end
end
