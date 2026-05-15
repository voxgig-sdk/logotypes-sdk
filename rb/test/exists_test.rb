# Logotypes SDK exists test

require "minitest/autorun"
require_relative "../Logotypes_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = LogotypesSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
