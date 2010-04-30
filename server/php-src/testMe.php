<?php

require_once 'FunctionalTestingSeleniumTestCase.php';

class Example extends FunctionalTestingSeleniumTestCase
{
  protected function setUp()
  {
    $this->setBrowser("*firefox");
    $this->setBrowserUrl("http://3akai.sakaiproject.org/dev/");
  }

  public function testMyTestCase()
  {$this->setConfiguration(82, 'firefox', 'macosx', 36);

    $this->open("/dev/");sleep(3);
    $this->type("username", "admin");
    $this->type("password", "admin");
    $this->click("loginbutton");
    sleep(3);
    $this->takeScreenshot();
    $this->click("link=Edit Profile");
    sleep(3);
    $this->takeScreenshot();
    try {
        $this->assertTrue($this->isTextPresent("admin admin"));$this->saveTest('assertTrue(isTextPresent(\"admin admin\"))','',true);
    } catch (PHPUnit_Framework_AssertionFailedError $e) {
 $this->saveTest('assertTrue(isTextPresent(\"admin admin\"))','',false);
      array_push($this->verificationErrors, $e->toString());
    }
    $this->select("txt_unirole", "label=Graduate Student");
    $this->takeScreenshot();
    $this->select("txt_unirole", "label=Non-academic Staff");
    $this->takeScreenshot();
    $this->click("link=My Sakai");
    sleep(3);
    $this->takeScreenshot();
    $this->click("link=Sign out");
    sleep(3);
    $this->takeScreenshot();
  }
}
?>