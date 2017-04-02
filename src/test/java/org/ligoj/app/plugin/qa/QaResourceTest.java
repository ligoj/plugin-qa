package org.ligoj.app.plugin.qa;

import java.io.IOException;

import javax.transaction.Transactional;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Test class of {@link QaResource}
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:/META-INF/spring/application-context-test.xml")
@Rollback
@Transactional
public class QaResourceTest {

	@Autowired
	private QaResource resource;

	@Test
	public void getKey() throws IOException {
		// Coverage only
		Assert.assertEquals("service:qa", resource.getKey());
	}
}
